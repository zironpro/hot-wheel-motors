import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { parse } from 'csv-parse/sync';
import sharp from 'sharp';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

// Helper to execute tasks concurrently in small batches to maximize speed without overloading RAM or DB
async function processInBatches<T, R>(
  items: T[],
  batchSize: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((item, index) => fn(item, i + index)));
    results.push(...batchResults);
  }
  return results;
}

async function getDriveFolderImages(folderId: string, apiKey?: string): Promise<{ url: string; fileName?: string; mimeType?: string }[]> {
  if (!apiKey) {
    console.warn(`[Google Drive] GOOGLE_DRIVE_API_KEY environment variable is not set. Cannot fetch contents for folder ID ${folderId}.`);
    return [];
  }

  const images: { url: string; fileName?: string; mimeType?: string }[] = [];
  let pageToken: string | undefined = undefined;

  do {
    try {
      const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
      let apiUrl = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${apiKey}&fields=nextPageToken,files(id,name,mimeType)&pageSize=100`;
      if (pageToken) {
        apiUrl += `&pageToken=${encodeURIComponent(pageToken)}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Google Drive API Error] Failed to fetch folder contents (status ${response.status}):`, errText);
        break;
      }

      const data = await response.json();
      const files: DriveFile[] = data.files || [];

      for (const file of files) {
        const isImageMime = file.mimeType?.startsWith('image/');
        const isImageExt = /\.(jpg|jpeg|png|webp|gif|avif|heic|bmp|tiff)$/i.test(file.name || '');

        if (isImageMime || isImageExt) {
          const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${apiKey}`;
          images.push({
            url: downloadUrl,
            fileName: file.name,
            mimeType: file.mimeType,
          });
        }
      }

      pageToken = data.nextPageToken;
    } catch (err) {
      console.error(`[Google Drive] Error fetching folder files for folder ${folderId}:`, err);
      break;
    }
  } while (pageToken);

  return images;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileContent = await file.text();
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as any[];

    if (!records || records.length === 0) {
      return NextResponse.json({ error: 'CSV file is empty or invalid' }, { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send = (data: any) => {
          try {
            controller.enqueue(encoder.encode(JSON.stringify(data) + '\n'));
          } catch (e) {
            console.error('Error enqueueing stream data:', e);
          }
        };

        try {
          send({ type: 'init', total: records.length });

          const payload = await getPayload({ config: configPromise });
          const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

          let added = 0;
          let skipped = 0;
          let errors = 0;
          let processed = 0;
          const skippedDetails: { car: string; reason: string }[] = [];
          const errorDetails: { car: string; reason: string }[] = [];

          // Process car records concurrently in batches of 5 for optimal speed
          await processInBatches(records, 5, async (record) => {
            const vin = record.vin || '';
            const slug = record.slug || `${record.make}-${record.model}-${record.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const carTitle = `${record.make || ''} ${record.model || ''} ${record.year || ''}`.trim() || slug;
            
            let status: 'added' | 'skipped' | 'error' = 'added';
            let itemReason = '';

            try {
              // Fast Deduplication check
              const queryParams: any = {
                collection: 'cars',
                limit: 1,
                where: vin ? { vin: { equals: vin } } : { slug: { equals: slug } },
              };
              
              const existing = await payload.find(queryParams);
              if (existing.docs.length > 0) {
                skipped++;
                const matchType = vin ? `VIN (${vin})` : `Slug (${slug})`;
                itemReason = `Already exists in database with matching ${matchType}`;
                skippedDetails.push({
                  car: carTitle,
                  reason: itemReason,
                });
                status = 'skipped';
                return;
              }

              // Collect all image download targets
              const downloadTargets: { downloadUrl: string; fallbackUrl?: string; fileName?: string }[] = [];
              if (record.image_url) {
                const urls = record.image_url.split(',').map((u: string) => u.trim()).filter(Boolean);

                // Resolve URLs in parallel
                await Promise.all(
                  urls.map(async (rawUrl: string) => {
                    const folderMatch = rawUrl.match(/\/folders\/([a-zA-Z0-9_-]+)/);
                    if (folderMatch) {
                      const folderId = folderMatch[1];
                      const folderImages = await getDriveFolderImages(folderId, apiKey);
                      for (const img of folderImages) {
                        const fileIdMatch = img.url.match(/\/files\/([a-zA-Z0-9_-]+)/);
                        const fileId = fileIdMatch ? fileIdMatch[1] : '';
                        downloadTargets.push({
                          downloadUrl: img.url,
                          fallbackUrl: fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : undefined,
                          fileName: img.fileName,
                        });
                      }
                    } else if (rawUrl.includes('drive.google.com/file/d/')) {
                      const match = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                      if (match) {
                        const fileId = match[1];
                        const downloadUrl = apiKey
                          ? `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`
                          : `https://drive.google.com/uc?export=download&id=${fileId}`;
                        const fallbackUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                        downloadTargets.push({ downloadUrl, fallbackUrl });
                      } else {
                        downloadTargets.push({ downloadUrl: rawUrl });
                      }
                    } else {
                      downloadTargets.push({ downloadUrl: rawUrl });
                    }
                  })
                );
              }

              // Process image downloads & WebP compression in parallel batches of 5
              const mediaResults = await processInBatches(downloadTargets, 5, async (target, index) => {
                try {
                  let imgRes = await fetch(target.downloadUrl);
                  if (!imgRes.ok && target.fallbackUrl && target.fallbackUrl !== target.downloadUrl) {
                    imgRes = await fetch(target.fallbackUrl);
                  }

                  if (imgRes.ok) {
                    const arrayBuffer = await imgRes.arrayBuffer();
                    let buffer = Buffer.from(arrayBuffer);
                    let mimetype = 'image/webp';

                    try {
                      buffer = await sharp(buffer)
                        .webp({ quality: 80 })
                        .toBuffer();
                    } catch (sharpErr) {
                      console.warn(`[WebP Compression] Failed to compress image for ${slug}, preserving original buffer format:`, sharpErr);
                      mimetype = imgRes.headers.get('content-type') || 'image/jpeg';
                    }

                    const rawName = target.fileName || `${slug}-${index + 1}`;
                    const baseName = rawName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_.-]+/g, '-');
                    const name = mimetype === 'image/webp' ? `${baseName}.webp` : `${baseName}.${mimetype.split('/')[1] || 'jpg'}`;

                    const media = await payload.create({
                      collection: 'media',
                      data: {
                        alt: `${record.make} ${record.model} - Image ${index + 1}`,
                      },
                      file: {
                        data: buffer,
                        mimetype,
                        name,
                        size: buffer.length,
                      }
                    });
                    return media.id;
                  }
                } catch (imgErr) {
                  console.error(`Failed to download image for ${slug} from ${target.downloadUrl}`, imgErr);
                }
                return null;
              });

              const mediaIds = mediaResults.filter((id): id is NonNullable<typeof id> => id !== null);

              // Create Car Record
              const features = record.features ? record.features.split(',').map((f: string) => ({ feature: f.trim() })) : [];
              const images = mediaIds.map(id => ({ image: id }));

              await payload.create({
                collection: 'cars',
                data: {
                  make: record.make || 'Unknown',
                  model: record.model || 'Unknown',
                  slug,
                  year: parseInt(record.year, 10) || new Date().getFullYear(),
                  vin,
                  currency: record.currency || 'AED',
                  price: parseInt(record.price?.replace(/[^0-9]/g, ''), 10) || 0,
                  engine: record.engine || 'N/A',
                  kmDriven: record.kmDriven || '0 km',
                  color: record.color || 'Unknown',
                  available: record.available !== undefined ? (String(record.available).toLowerCase() === 'true' || String(record.available) === '1') : true,
                  features,
                  description: record.description || '',
                  images,
                }
              });
              added++;
              status = 'added';
            } catch (carErr: any) {
              console.error(`Failed to create car ${slug}`, carErr);
              errors++;
              status = 'error';
              itemReason = carErr.message || 'Unknown database error';
              errorDetails.push({
                car: carTitle,
                reason: itemReason,
              });
            } finally {
              processed++;
              send({
                type: 'progress',
                current: processed,
                total: records.length,
                car: carTitle,
                status,
                added,
                skipped,
                errors,
                reason: itemReason,
              });
            }
          });

          send({
            type: 'complete',
            added,
            skipped,
            errors,
            skippedDetails,
            errorDetails,
            message: `Added: ${added}, Skipped: ${skipped}, Errors: ${errors}`,
          });
        } catch (streamErr: any) {
          console.error('Bulk Import Stream Error:', streamErr);
          send({ type: 'error', error: streamErr.message || 'Internal stream error' });
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Bulk Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

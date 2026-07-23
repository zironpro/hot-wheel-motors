import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { parse } from 'csv-parse/sync';

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

    const payload = await getPayload({ config: configPromise });
    let added = 0;
    let skipped = 0;
    let errors = 0;

    for (const record of records) {
      const vin = record.vin || '';
      const slug = record.slug || `${record.make}-${record.model}-${record.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      // Deduplication check
      let queryParams: any = { collection: 'cars', limit: 1, where: {} };
      if (vin) {
        queryParams.where = { vin: { equals: vin } };
      } else {
        queryParams.where = { slug: { equals: slug } };
      }
      
      const existing = await payload.find(queryParams);
      if (existing.docs.length > 0) {
        skipped++;
        continue;
      }

      // Fetch Images
      const mediaIds: any[] = [];
      if (record.image_url) {
        const urls = record.image_url.split(',').map((u: string) => u.trim()).filter(Boolean);
        let index = 1;
        for (let url of urls) {
          try {
            // Handle Google Drive links
            if (url.includes('drive.google.com/file/d/')) {
              const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
              if (match) {
                url = `https://drive.google.com/uc?export=download&id=${match[1]}`;
              }
            }
            
            const imgRes = await fetch(url);
            if (imgRes.ok) {
              const arrayBuffer = await imgRes.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              
              const media = await payload.create({
                collection: 'media',
                data: {
                  alt: `${record.make} ${record.model} - Image ${index}`,
                },
                file: {
                  data: buffer,
                  mimetype: imgRes.headers.get('content-type') || 'image/jpeg',
                  name: `${slug}-${index}.jpg`,
                  size: buffer.length,
                }
              });
              mediaIds.push(media.id);
              index++;
            }
          } catch (imgErr) {
            console.error(`Failed to download image for ${slug} from ${url}`, imgErr);
          }
        }
      }

      // Create Car
      try {
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
      } catch (carErr) {
        console.error(`Failed to create car ${slug}`, carErr);
        errors++;
      }
    }

    return NextResponse.json({ message: `Added: ${added}, Skipped: ${skipped}, Errors: ${errors}` });
  } catch (error: any) {
    console.error('Bulk Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const maxDuration = 300; // allow up to 5 minutes

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const contentDir = path.join(process.cwd(), 'src', 'content', 'cars');
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json({ error: 'Content directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));
    const results = [];

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content: markdownBody } = matter(fileContent);

      // Check if car already exists
      const existingCar = await payload.find({
        collection: 'cars',
        where: {
          slug: { equals: frontmatter.slug }
        }
      });

      if (existingCar.totalDocs > 0) {
        results.push({ file, status: 'skipped', reason: 'slug already exists' });
        continue;
      }

      // Parse Specs (e.g., "BLACK | 4,000 KM | V8")
      const specsParts = (frontmatter.specs || '').split('|').map((s: string) => s.trim());
      const color = specsParts[0] || 'Unknown';
      const kmDriven = specsParts[1] || '0 KM';
      const engine = specsParts[2] || 'Unknown';

      // Parse Price (e.g., "AED 444,000" or "Price on Request")
      let currency = 'AED';
      let priceValue = 0;
      if (frontmatter.price) {
        if (frontmatter.price.toLowerCase().includes('request')) {
          priceValue = 0;
        } else {
          const parts = frontmatter.price.split(' ');
          if (parts.length >= 2) {
            currency = parts[0];
            priceValue = parseInt(parts[1].replace(/,/g, ''), 10);
          } else {
            priceValue = parseInt(frontmatter.price.replace(/,/g, ''), 10);
          }
        }
      }

      // Parse Year from subtitle (e.g., "2022 MODEL")
      let year = new Date().getFullYear();
      if (frontmatter.subtitle) {
        const match = frontmatter.subtitle.match(/\d{4}/);
        if (match) year = parseInt(match[0], 10);
      }

      // Parse Make and Model from Name (e.g., "ASTON MARTIN" or "BMW X7 M60i")
      let make = frontmatter.name || 'Unknown Make';
      let model = 'Base';
      const nameParts = make.split(' ');
      if (nameParts.length > 1) {
        if (nameParts[0].toUpperCase() === 'ASTON' || nameParts[0].toUpperCase() === 'LAND' || nameParts[0].toUpperCase() === 'RANGE') {
            make = nameParts[0] + ' ' + nameParts[1];
            model = nameParts.slice(2).join(' ') || 'Base';
        } else if (nameParts[0].toUpperCase() === 'MERCEDES-BENZ') {
            make = 'Mercedes-Benz';
            model = nameParts.slice(1).join(' ') || 'Base';
        } else {
            make = nameParts[0];
            model = nameParts.slice(1).join(' ');
        }
      }

      // Helper to upload Media
      const uploadMedia = async (imagePath: string) => {
        if (!imagePath) return null;
        
        const absolutePath = path.join(process.cwd(), 'public', imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
        if (!fs.existsSync(absolutePath)) {
          console.warn(`Image not found: ${absolutePath}`);
          return null;
        }

        const fileName = path.basename(absolutePath);
        
        // Check if media already exists by filename
        const existingMedia = await payload.find({
          collection: 'media',
          where: {
            filename: { equals: fileName }
          }
        });

        if (existingMedia.totalDocs > 0) {
          return existingMedia.docs[0].id;
        }

        const fileData = fs.readFileSync(absolutePath);
        const stats = fs.statSync(absolutePath);
        const ext = path.extname(absolutePath).toLowerCase();
        let mimeType = 'application/octet-stream';
        if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        else if (ext === '.png') mimeType = 'image/png';
        else if (ext === '.webp') mimeType = 'image/webp';
        else if (ext === '.gif') mimeType = 'image/gif';

        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: frontmatter.name + ' image',
          },
          file: {
            data: fileData,
            mimetype: mimeType,
            name: fileName,
            size: stats.size,
          }
        });

        return mediaDoc.id;
      };

      const imageIds = [];

      // Upload main image
      if (frontmatter.image) {
        const id = await uploadMedia(frontmatter.image);
        if (id) imageIds.push({ image: id });
      }

      // Upload gallery images
      if (frontmatter.gallery && Array.isArray(frontmatter.gallery)) {
        for (const imgPath of frontmatter.gallery) {
          const id = await uploadMedia(imgPath);
          if (id && !imageIds.some(i => i.image === id)) {
            imageIds.push({ image: id });
          }
        }
      }

      // Ensure images array has at least one image if the schema requires it
      if (imageIds.length === 0) {
        console.warn(`Skipping ${file} because it has no valid images and images are required.`);
        results.push({ file, status: 'skipped', reason: 'no images found' });
        continue;
      }

      // Create Car record
      const carData = {
        make,
        slug: frontmatter.slug,
        model,
        year,
        currency,
        price: priceValue,
        engine,
        kmDriven,
        color,
        features: (frontmatter.features || []).map((f: string) => ({ feature: f })),
        description: markdownBody.trim() || 'No description provided.',
        images: imageIds,
      };

      const newCar = await payload.create({
        collection: 'cars',
        data: carData,
      });

      results.push({ file, status: 'created', id: newCar.id });
    }

    return NextResponse.json({ success: true, processed: files.length, results });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

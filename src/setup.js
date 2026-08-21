import fs from 'fs';
import path from 'path';
const target = '/data/payload.db';
const template = path.join(process.cwd(), 'template.db');
if (fs.existsSync('/data')) {
  console.log('Overwriting database in volume with template...');
  fs.copyFileSync(template, target);
} else {
  console.log('No /data volume found. Skipping copy.');
}

const fs = require('fs');
const path = require('path');
const target = '/data/payload.db';
const template = path.join(process.cwd(), 'template.db');
if (fs.existsSync('/data')) {
  console.log('Copying database template to volume (overwriting existing)...');
  fs.copyFileSync(template, target);

} else {
  console.log('No /data volume found. Skipping copy.');
}

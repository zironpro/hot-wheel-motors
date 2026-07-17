const fs = require('fs');
const path = require('path');
const target = '/data/payload.db';
const template = path.join(process.cwd(), 'template.db');
if (fs.existsSync('/data')) {
  if (!fs.existsSync(target)) {
    console.log('Copying database template to volume...');
    fs.copyFileSync(template, target);
  } else {
    console.log('Database already exists in volume. Skipping copy.');
  }

} else {
  console.log('No /data volume found. Skipping copy.');
}

const fs = require('fs');
const path = require('path');
const target = '/data/payload.db';
const template = path.join(process.cwd(), 'template.db');
if (fs.existsSync('/data') && !fs.existsSync(target)) {
  console.log('Copying database template to volume...');
  fs.copyFileSync(template, target);
}

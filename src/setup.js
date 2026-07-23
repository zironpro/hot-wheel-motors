const fs = require('fs');
const path = require('path');
const target = '/data/payload.db';
const template = path.join(process.cwd(), 'template.db');
if (fs.existsSync('/data')) {
  console.log('Overwriting production database volume with template.db...');
  fs.copyFileSync(template, target);
  console.log('Database successfully overwritten.');
} else {
  console.log('No /data volume found. Skipping copy.');
}

const fs = require('fs');
const path = require('path');
const target = '/data/payload.db';
const template = path.join(process.cwd(), 'template.db');
if (fs.existsSync('/data')) {
  let shouldCopy = false;
  if (!fs.existsSync(target)) {
    shouldCopy = true;
  } else {
    const stats = fs.statSync(target);
    if (stats.size < 30000) {
      console.log('Existing database is empty (no tables). Overwriting...');
      shouldCopy = true;
    }
  }
  if (shouldCopy) {
    console.log('Copying database template to volume...');
    fs.copyFileSync(template, target);
  } else {
    console.log('Database already populated. Skipping copy.');
  }
} else {
  console.log('No /data volume found. Skipping copy.');
}

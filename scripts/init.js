const fs = require('fs');
const path = require('path');

const dirs = [
  'dist/main',
  'dist/renderer',
  'dist/assets'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

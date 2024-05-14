#!/usr/bin/node

const fs = require('fs');
const filePath = process.argv[2];

if (!filePath) {
  console.error('File path not provided');
  process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data);
});

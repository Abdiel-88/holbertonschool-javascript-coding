#!/usr/bin/node

const fs = require('fs');
const filePath = process.argv[2];

// Read the file content in utf-8
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

#!/usr/bin/node

const fs = require('fs');
const filePath = process.argv[2];
const stringToWrite = process.argv[3];

// Write the string to the file in utf-8
fs.writeFile(filePath, stringToWrite, 'utf8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('String written to file successfully');
});

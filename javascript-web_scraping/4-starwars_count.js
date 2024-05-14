#!/usr/bin/node
const request = require('request');
const useURL = process.argv[2];

request(useURL, (err, res, body) => {
  if (err) {
    console.log(err);
  } else if (res.statusCode === 200) {
    const moviesInfo = JSON.parse(body).results;
    let foundAmount = 0;
    for (let i = 0; i < moviesInfo.length; i++) {
      for (let j = 0; j < moviesInfo[i].characters.length; j++) {
        if (moviesInfo[i].characters[j].includes('/18/')) {
          foundAmount++;
        }
      }
    }
    console.log(foundAmount);
  } else {
    console.log('Invalid url');
  }
});

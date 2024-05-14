#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];
const characterId = 18;

if (!apiUrl) {
  console.error('API URL not provided');
  process.exit(1);
}

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  const data = JSON.parse(body);
  let count = 0;

  data.results.forEach(film => {
    if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
      count++;
    }
  });

  console.log(count);
});

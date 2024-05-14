#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

if (!movieId) {
  console.error('Movie ID not provided');
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  const data = JSON.parse(body);
  console.log(data.title);
});

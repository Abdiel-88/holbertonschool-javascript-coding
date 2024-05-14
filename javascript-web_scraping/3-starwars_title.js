#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

// Make a GET request to the Star Wars API
request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  // Parse the response body as JSON
  const data = JSON.parse(body);
  // Print the title of the movie
  console.log(data.title);
});

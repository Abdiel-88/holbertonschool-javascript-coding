#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];
const characterId = 18;  // Wedge Antilles

// Make a GET request to the Star Wars API
request(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    // Parse the response body as JSON
    const data = JSON.parse(body);
    let count = 0;

    // Loop through each film
    data.results.forEach(film => {
        // Check if character ID 18 is in the list of characters for the film
        if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
            count++;
        }
    });

    // Print the number of films where Wedge Antilles is present
    console.log(count);
});

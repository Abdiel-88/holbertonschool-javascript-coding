#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];

// Make a GET request to the specified API URL
request(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    // Parse the response body as JSON
    const tasks = JSON.parse(body);
    const completedTasks = {};

    // Loop through each task
    tasks.forEach(task => {
        if (task.completed) {
            if (!completedTasks[task.userId]) {
                completedTasks[task.userId] = 0;
            }
            completedTasks[task.userId]++;
        }
    });

    // Print the number of completed tasks by user
    console.log(completedTasks);
});

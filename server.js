const dataService = require('./data-service');
const express = require('express');
const app = express();

// Call the initialize() method from our data-service.js module
dataService.initialize()
  .then(() => {
    // Start the server
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });
  })
  .catch((err) => {
    // Output the error to the console
    console.log(err);
  });
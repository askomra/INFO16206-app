const express = require('express');
const dataService = require('./data-service');
const app = express();

app.use(express.static('public'));
dataService.initialize()
  .then(() => {
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });
  })
  .catch((err) => {
    console.log(`Error initializing data service: ${err}`);
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});
app.get('/employees', (req, res) => {
  dataService.getAllEmployees()
    .then(data => res.json(data))
    .catch(err => res.json({message: err}));
});

// Route to get all managers
app.get('/managers', (req, res) => {
  dataService.getManagers()
    .then(data => res.json(data))
    .catch(err => res.json({message: err}));
});
// Route to get all departments
app.get('/departments', (req, res) => {
  dataService.getAllDepartments()
    .then(data => res.send(data))
    .catch(err => {
      console.log(`Error: ${err}`);
      res.status(500).send('Error getting departments');
    });
});

// Route for any other request
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

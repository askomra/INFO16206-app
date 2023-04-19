const fs = require('fs');

let employees = [];
let departments = [];

module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/employees.json', 'utf8', (err, data) => {
            if (err) {
              reject('Unable to read file');
              return;
            }
            employees = JSON.parse(data);
            console.log('Parsed employees:', employees); // Add this line
            fs.readFile('./data/departments.json', 'utf8', (err, data) => {
              if (err) {
                reject('Unable to read file');
                return;
              }
              departments = JSON.parse(data);
              console.log('Parsed departments:', departments); // Add this line
              resolve();
            });
          });
          
    });
};

module.exports.getAllEmployees = function() {
    return new Promise((resolve, reject) => {
      if (employees.length == 0) {
        initialize()
          .then(() => resolve(employees))
          .catch(err => reject(err));
      } else {
        resolve(employees);
      }
    });
  };
  

module.exports.getManagers = function() {
    console.log('getManagers called');
    return new Promise((resolve, reject) => {
        const managers = employees.filter(employee => employee.isManager);
        console.log(managers); // log the managers data
        if (managers.length == 0) {
            reject('No results returned');
        } else {
            resolve(managers);
        }
    });
};
module.exports.getAllDepartments = function() {
    return new Promise((resolve, reject) => {
        if (departments.length == 0) {
            reject('No results returned');
        } else {
            resolve(departments);
        }
    });
};

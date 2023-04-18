const fs = require("fs");

let employees = [];
let departments = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/employees.json", "utf8", (err, data) => {
      if (err) {
        reject("Unable to read file");
      } else {
        employees = JSON.parse(data);

        fs.readFile("./data/departments.json", "utf8", (err, data) => {
          if (err) {
            reject("Unable to read file");
          } else {
            departments = JSON.parse(data);
            resolve();
          }
        });
      }
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    if (employees.length == 0) {
      reject("No results returned");
    } else {
      resolve(employees);
    }
  });
}

function getManagers() {
  return new Promise((resolve, reject) => {
    const managers = employees.filter((employee) => employee.isManager == true);
    if (managers.length == 0) {
      reject("No results returned");
    } else {
      resolve(managers);
    }
  });
}

function getDepartments() {
  return new Promise((resolve, reject) => {
    if (departments.length == 0) {
      reject("No results returned");
    } else {
      resolve(departments);
    }
  });
}

module.exports = {
  initialize,
  getAllEmployees,
  getManagers,
  getDepartments,
};

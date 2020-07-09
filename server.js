var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  promptUser();
});

function promptUser() {
    inquirer.prompt([
        {
            name: "userChoice",
            message: "What do you want to do?",
            type: "list",
            choices: 
            [
                "Add a department",
                "Add an employee",
                "Add a role",
                "View departments",
                "View employees",
                "View roles",
                "Update Employee Roles",
                "No need to do any more."
            ]
        }
    ]).then(function(data) {
        switch (data.userChoice) {

        }
    })
}
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "top_songsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    promptUser();
});

function promptUser() {
    inquirer.prompt([{
        name: "userChoice",
        message: "What do you want to do?",
        type: "list",
        choices: [
            "Add a department",
            "Add an employee",
            "Add a role",
            "View departments",
            "View employees",
            "View roles",
            "Update Employee Roles",
            "No need to do any more."
        ]
    }]).then(function (data) {
        switch (data.userChoice) {
            case "Add a department":
                addDepartment();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Add a role":
                addRole();
                break;

            case "View departments":
                viewDepartments();
                break;

            case "View employees":
                viewEmployees();
                break;

            case "View roles":
                viewRoles();
                break;

            case "Update Employee Roles":
                updateEmployeeRoles();
                break;

            case "No need to do any more.":
                stop();
                break;
        }
    })
}

function addDepartment() {

}

function addEmployee() {

}

function addRole() {

}

function viewDepartments() {

}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log("\n Employees currently in personnel_db \n");
        console.table(res);
    })
    promptUser();
}

function viewRoles() {

}

function updateEmployeeRoles() {

}

function stop() {

}
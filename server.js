var mysql = require("mysql");
var inquirer = require("inquirer");
//var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Aworldofideas1!",
    database: "personnel_db"
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
    inquirer.prompt({
        name: 'department',
        message: 'Enter the department you would like to add',
        type: 'input'
    }).then((data) => {
        connection.query("INSERT INTO department (department_name) VALUES (?)", [data.department], function(err, result) {
            if (err) {
              throw err;
            }
            console.log("Department added successfully");
            return promptUser();
          });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            message: "What is the employee's first name?",
            type: 'input'
        },
        {
            name: "lastName",
            message: "What is the employee's last name?",
            type: "input"
        },
        {
            name: "employeeRoleID",
            message: "What is the employee's role ID?",
            type: "input"
        },
        {
            name: "employeeManagerID",
            message: "What is the employee's manager's ID? (Please input null if no manager)",
            type: "input"
        }
    ]).then(function(answers){
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employeeFN, answers.employeeLN, answers.employeeRoleID, answers.employeeManagerID], function(err, result) {
            if (err) {
              throw err;
            }
            console.log("Added employee.");
            return main();
          });
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: 'role',
            message: 'Enter the role you would like to add',
            type: 'input'
        },
        {
            name: "salary",
            message: "What is the salary for this role?",
            type: "input"
        },
    ]).then((data) => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [data.role, data.salary,], function(err, result) {
            if (err) {
              throw err;
            }
            console.log("Role added successfully");
            return promptUser();
          });
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log("\n Departments currently in personnel_db \n");
        console.table(res);
    })
    promptUser();
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
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.log("\n Roles currently in personnel_db \n");
        console.table(res);
    })
    promptUser();
}


async function updateEmployeeRoles() {
    inquirer.prompt([{
            name: "title",
            message: "What is the title of the updated role?",
            type: "input"
        },
        {
            name: "salary",
            message: "What is the salary of the updated role?",
            type: "input"
        },
    ]).then((data) => {
        app.get("/:roles", function (req, res) {
            connection.query("UPDATE roles WHERE ? ",
                [{
                        title: (`${data.title}`)
                    },
                    {
                        salary: (`${data.salary}`)
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                })
            promptUser();
        })
    })

}

function stop() {
    console.log("Connection to personnel_db ended");
    connection.end();
}
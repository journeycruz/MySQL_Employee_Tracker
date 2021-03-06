var mysql = require("mysql");
var inquirer = require("inquirer");
//var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DGE32RS",
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
            "View departments",
            "View employees",
            "View roles",
            "Add a department",
            "Add an employee",
            "Add a role",
            "Remove employee",
            "Remove department",
            "Remove role",
            "Update existing role",
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

            case "Update existing role":
                updateEmployeeRoles();
                break;

            case "Remove employee":
                deleteEmployee();
                break;

            case "Remove department":
                deleteDepartment();
                break;

            case "Remove role":
                deleteRole();
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
        connection.query("INSERT INTO department (department_name) VALUES (?)", [data.department], function (err, result) {
            if (err) {
                throw err;
            }
            console.log("\n----------\n");
            console.log("Department added successfully");
            console.log("\n----------\n");
            return promptUser();
        });
    });
}

function addEmployee() {
    inquirer.prompt([{
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
            message: "Enter the role ID of this employee",
            type: "input"
        },
    ]).then((data) => {
        connection.query("INSERT INTO employee (firstName, lastName, role_id) VALUES (?, ?, ?)", [data.firstName, data.lastName, data.employeeRoleID], function (err, result) {
            if (err) {
                throw err;
            }
            console.log("\n----------\n");
            console.log("Employee added successfully");
            console.log("\n----------\n");

            return promptUser();
        });
    });
}

function addRole() {
    inquirer.prompt([{
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
        connection.query("INSERT INTO roles (title, salary) VALUES (?, ?)", [data.role, data.salary], function (err, result) {
            if (err) {
                throw err;
            }
            console.log("\n----------\n");
            console.log("Role added successfully");
            console.log("\n----------\n");
            return promptUser();
        });
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log("\n----------\n");
        console.log("Departments currently in personnel_db");
        console.log("\n----------\n");
        console.table(res);
    })
    promptUser();
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log("\n----------\n");
        console.log("Employees currently in personnel_db");
        console.log("\n----------\n");
        console.table(res);
    })
    promptUser();
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.log("\n----------\n");
        console.log("Roles currently in personnel_db");
        console.log("\n----------\n");
        console.table(res);
    })
    promptUser();
}

function deleteEmployee() {
    connection.query("SELECT * FROM employee", (err) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "deleteEmployee",
                type: "input",
                message: "Enter the ID number for the employee you would like to remove"
            }])
            .then((data) => {
                connection.query("DELETE FROM employee where ?", {

                    employee_id: data.deleteEmployee

                });
                console.log("\n----------\n");
                console.log("Employee removed")
                console.log("\n----------\n");
                promptUser();
            });
    });
}

function deleteDepartment() {
    connection.query("SELECT * FROM department", (err) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "deleteDepartment",
                type: "input",
                message: "Enter the ID number for the department you would like to remove"
            }])
            .then((data) => {
                connection.query("DELETE FROM department where ?", {

                    department_id: data.deleteDepartment

                });
                console.log("\n----------\n");
                console.log("Department removed")
                console.log("\n----------\n");
                promptUser();
            });
    });
}

function deleteRole() {
    connection.query("SELECT * FROM roles", (err) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "deleteRole",
                type: "input",
                message: "Enter the ID number for the role you would like to remove"
            }])
            .then((data) => {
                connection.query("DELETE FROM roles where ?", {

                    role_id: data.deleteRole

                });
                console.log("\n----------\n");
                console.log("Role removed")
                console.log("\n----------\n");
                promptUser();
            });
    });
}

function updateEmployeeRoles() {
    inquirer.prompt([{
            name: "employeeID",
            message: "What is the ID number of the employee who's role you would like to update?",
            type: "input"
        },
        {
            name: "updateRoleID",
            message: "What is the ID number for the role you would like to assign this employee?",
            type: "input"
        },
    ]).then((data) => {
        connection.query("UPDATE employee SET ? WHERE ? ",
            [{
                    role_id: data.updateRoleID,
                },
                {
                    employee_id: data.employeeID
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        promptUser();

    })

}

function stop() {
    console.log("\n----------\n");
    console.log("Connection to personnel_db ended");
    console.log("\n----------\n");
    connection.end();
}
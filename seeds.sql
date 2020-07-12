INSERT INTO department (department_name) VALUES ("Production");
INSERT INTO department (department_name) VALUES ("Research & Development");
INSERT INTO department (department_name) VALUES ("Marketing");
INSERT INTO department (department_name) VALUES ("Accounting & Finance");
INSERT INTO department (department_name) VALUES ("Human Resources");

INSERT INTO roles (title, salary, department_id) VALUES ("Production Supervisor", 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("R&D Technician", 40000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Marketing Supervisor", 60000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 60000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Human Resources Representative", 40000, 5);

INSERT INTO employee (firstName, lastName, role_id) VALUES ("Journey", "Cruz", 1);
INSERT INTO employee (firstName, lastName, role_id) VALUES ("Harry", "Potter", 2);
INSERT INTO employee (firstName, lastName, role_id) VALUES ("John", "Wick", 3);
INSERT INTO employee (firstName, lastName, role_id) VALUES ("Massiel", "Hill", 4);
INSERT INTO employee (firstName, lastName, role_id) VALUES ("Regina", "Rodriguez", 5);
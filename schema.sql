DROP DATABASE IF EXISTS personnel_db;
CREATE DATABASE personnel_db;
USE personnel_db;


CREATE TABLE department (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY(department_id)
);

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary INT,
  department_id INT AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  employee_id INT AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  role_id INT,
  PRIMARY KEY (employee_id)
);

SELECT * FROM employees, roles, salary;
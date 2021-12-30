INSERT INTO department (name)
VALUES
('Engineering'), ('Administration'), ('Sales'), ('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES
('Junior Developer', 75000, 1),
('Intermediate Developer', 80000, 1),
('Senior Engineer', 120000, 1),
('Payroll Administrator', 80000, 2),
('HR Admin', 72000, 2),
('HR Director', 140000, 2),
('Sales Coordinator', 70500, 3),
('Sales Analyst', 72000, 3),
('Sales Director', 92000, 3),
('Accountant', 72000, 4),
('Financial Analyst', 72500, 4),
('Finance Manager', 88000, 4);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Bryce', 'March', 3, NULL),
('Laura', 'Griffiths', 6, NULL),
('Caroline', 'Richards', 9, NULL),
('Tessa', 'Thompson', 12, NULL),
('Carter', 'Dumanowski', 1, 1),
('Rachel', 'Maddow', 2, 1),
('Lee', 'Kurek', 4, 2),
('Beth', 'Maiden', 5, 2),
('Regina', 'George', 7, 3),
('Kris', 'Nielsen', 8, 3),
('Idris', 'Llewellyn', 10, 4),
('David', 'Jones', 11, 4);
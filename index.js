const inquirer = require('inquirer');
const db = require('./config/connection');

//to display as a table
const table = require("console.table");
// throw an error if the user fails to connect
db.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// Template:
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + result);
//     });
//   });
//get questions then take answers, invoke handler functions to perform action, then start
    function questions() {
        inquirer
            .prompt([
            //first menu 
            {
                type: 'list',
                name: 'main',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department', 
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Record',
                    'Quit'
                    
                ]
            }
        ])
        .then(function (input) {
            if (input.main === 'View All Departments') {
                getDept();
            } else if (input.main === 'View All Roles') {
                getRole();
            } else if (input.main === 'View All Employees') {
                getEmployee();
            } else if (input.main === 'Add a Department') {
                addDept();
            } else if (input.main === 'Add a Role') {
                addRole();
            } else if (input.main === 'Add an Employee') {
                addEmployee();
            } else if (input.main === 'Update an Employee Record') {
                update();
            } else if (input.main === 'Quit') {
                console.log('Leaving Employee Tracker');
                db.end();
                return;
            }
        });
    };

    function getDept() {
        //get formatted table showing all department names and department ids
        const sql = `SELECT * FROM department;`;
        db.query(sql, function(err, res) {
            if (err) throw err;
            console.table(res);
            questions();
        });     
    };
    function getRole() {
        //job title, role id, the department that role belongs to, and the salary for that role
        const sql = `SELECT role.id, role.title, role.salary, dept.name
                     FROM role AS role
                     LEFT JOIN department AS dept
                     ON dept.id = role.department_id;`;
        db.query(sql, function(err, res) {
            if (err) throw err;
            console.table(res);
            questions();
        }) 
    };
    function getEmployee() {
        //formatted table showing employee data, including employee ids, 
        //first names, last names, job titles, departments, salaries, 
        //and managers that the employees report to
        const sql = `SELECT FROM e.*, r.title, r.salary, r.department_id
                     FROM employee AS e
                     LEFT JOIN role AS r
                     ON r.id = e.role_id;`;
        db.query(sql, function(err, res) {
            if (err) throw err;
            console.table(res);
            questions();
        });
    };
    
    function addDept() {
        //I am prompted to enter the name of the department 
        
        inquirer    
            .prompt([
                {
                    type: 'input',
                    name: 'dept',
                    message: 'Please add the name of the department'
                }
            ])
            //and that department is added to the database
            .then(function (updatedDept) {
                const department = updatedDept.dept;

                const sql = `INSERT INTO department (dept)
                            VALUES ('${department}')`;
                
                db.query(sql, function(err, result) {
                    if (err) throw err;
                    console.table(result);
                    questions();
                })
            })
    };

    function addRole() {
        //I am prompted to enter the name, salary, and department for the role 
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'Please enter the name of the new role'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter the salary for this role.'
                },
                {
                    //dept id not name
                    type: 'input',
                    name: 'deptId',
                    message: 'Please enter the department id'
                }
            ])
            //and that role is added to the database
            .then(function (updatedRole) {
                const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES ('${updatedRole.role}', '${updatedRole.salary}', '${updatedRole.deptId}')`;
                
                db.query(sql, function(err, result) {
                    if (err) throw err;
                    console.table(result);
                    questions();
                })
            });
    };
    function addEmployee() {
        //I am prompted to enter the employee’s first name, last name, role, and manager 
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Please enter the first name of the new employee'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Please enter the last name of the new employee.'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: "Please enter the role id for this employee."
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Please enter the manager id for this employee'
                }
            ])
        //and that employee is added to the database
        .then(function (updatedEmployee) {
            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES ('${updatedEmployee.first_name}', '${updatedEmployee.last_name}', '${updatedEmployee.roleId}', '${updatedEmployee.managerId}')`;
            
            db.query(sql, function(err, result) {
                if (err) throw err;
                console.table(result);
                questions();
            })
        });
    };
    function update() {
        //I am prompted to select an employee to update and their new role and this information is updated in the database 
        addEmployee();
    };

           

questions();
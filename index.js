const inquirer = require('inquirer');
const db = require('./config/connection');

//to display as a table
const table = require("console.table");
// throw an error if the user fails to connect
db.connect((err) => {
    if (err) throw err;
});

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

    function getDept() {};
    function getRole() {};
    function getEmployee() {};
    
    function addDept() {};
    function addRole() {};
    function addEmployee() {};
    function update() {};

            {
                type: 'list',
                name: 'department',
                choices: ['Engineering', 'Administration', 'Sales', 'Accounting'],
                message: 'Which department would you like to view?',
                when: //view all employees by department
            },
            {
                type: 'list',
                name: 'manager',
                choices: [''],
                message: 'Which manager would you like to view?',
                when: //view all employees by manager
            },
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
                when: //add employee   
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
                when: //first name 
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: [],
                when: //last name
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: [],
                when: //role
            },
            {
               type: 'list',
               name: 'removeEmployee',
               message: 'Which employee do you want to remove?',
               choices: [],
               when: //remove employee 
            },
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: [],
                when: //update employee role || update employee manager
            },
            
            {
                type:
                name:
                message: "Who is the employee's new manager?",
                choices: [],
                when: // Update Employee Manager
            },
            
        // View All Roles
            {
                type: 'input',
                name: 'addRole',
                message: 'Which role would you like to add?',
                when: // Add Role
            },
            {
                type: 'list',
                name: 'removeRole',
                message: 'Which role do you want to remove?',
                choices: [],
                when: // Remove Role
            }
        ]);
    }

questions();
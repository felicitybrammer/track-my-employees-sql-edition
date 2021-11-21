const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: 'company'
    },
    console.log('Connected to Database')
).promise();

module.exports = db;
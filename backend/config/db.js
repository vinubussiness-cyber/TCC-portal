
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Prem@2003',
    database: 'tcc_employee_portal'
})

module.exports = db;


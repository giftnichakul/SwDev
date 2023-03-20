const mysql = require('mysql');

var connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Gift2736",
    database: "vacCenter"
});

module.exports = connection;
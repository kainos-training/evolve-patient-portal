var mysql = require('mysql');
const config = require('./config');

const database = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL");
});

module.exports = database;

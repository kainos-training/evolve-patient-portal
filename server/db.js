const mysql = require('mysql');
const config = require('./config.json');

const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL");
});

exports.testQuery = function (callback){
    db.query(
        "select * from user limit 10;",
        function(err, rows) {
            if(err) throw err;
            callback(rows);
        }
    );
};

exports.checkUserValid = function (username, callback){
    db.query(
        "SELECT username FROM user WHERE username = ?",
        [username],
        function(err, rows) {
            if(err) throw err;
            callback(rows);
        }
    );
};
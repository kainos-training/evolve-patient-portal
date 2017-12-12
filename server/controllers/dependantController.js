const db = require('../db');

exports.getAllDependants = function(req, res) {
    let userID = req.body.userID;
    db.query(
        "SELECT `User`.userID, title, firstName, lastName, MRIN, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, address, email, User.gpID, GP.gpFullName, GP.gpPracticeName  " +
        "FROM `UserDependant` JOIN User ON `UserDependant`.dependantID = `User`.userID " +
        "JOIN GP ON User.gpID = GP.gpID " +
        "WHERE `UserDependant`.userID = ? ;", [userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
};
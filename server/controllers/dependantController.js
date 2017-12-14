const db = require('../db');

exports.getAllDependants = function(req, res) {
    let userID = req.body.userID;
    db.query(
        "SELECT `User`.userID, title, firstName, lastName, MRIN, phoneNumber, address, email " +
        "FROM `UserDependant` JOIN User ON `UserDependant`.dependantID = `User`.userID " +
        "WHERE `UserDependant`.userID = ? ;", [userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(rows);
            }
        }
    )
};
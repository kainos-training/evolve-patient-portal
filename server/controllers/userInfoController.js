const db = require('../db');

exports.getUserInfoByUserID = function(req, res) {
    let userID = req.body.userID;
    db.query(
        
        "SELECT userID, firstName, lastName, dateOfBirth, phoneNumber, title, gender, MRIN, address, email " +
        "FROM User " +
        "WHERE userID = ? ", 
        [userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
};
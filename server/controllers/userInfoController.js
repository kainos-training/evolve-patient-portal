const db = require('../db');

exports.getUserInfoByUserID = function(req, res) {
    let userID = req.body.userID;
    db.query(
        
        "SELECT userID, firstName, lastName, dateOfBirth, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, title, gender, MRIN, address, email, user.gpID, GP.gpFullName, GPPractice.gpPracticeName " +
        "FROM User " +
        "INNER JOIN GP ON User.gpID = GP.gpID " +
        "INNER JOIN GPPractice ON GP.gpPracticeID=GPPractice.gpPracticeID "+
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
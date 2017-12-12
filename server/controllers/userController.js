const db = require('../db');

exports.updateUserDetails = function(req, res) {
    var email = req.body.email;
    var preferredName = req.body.preferredName;
    var address = req.body.address;
    var mobilePhoneNumber = req.body.mobilePhoneNumber;
    var homePhoneNumber = req.body.homePhoneNumber;
    var workPhoneNumber = req.body.workPhoneNumber;
    var userID = req.body.userID;

    db.query('Update User SET email=?, preferredName=?, address=?, mobilePhoneNumber=?, homePhoneNumber=?, workPhoneNumber=? where userID=?',
        [email, preferredName, address, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    );
};
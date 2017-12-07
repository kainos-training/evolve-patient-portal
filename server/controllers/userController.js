const db = require('../db');

exports.updateUserDetails = function(req, res) {
    var email = req.body.email;
    var address = req.body.address;
    var phoneNumber = req.body.phoneNumber;
    var userID = req.body.userID;

    db.query('Update User SET email=?, address=?, phoneNumber=? where userID=?',
        [email, address, phoneNumber, userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    );
};
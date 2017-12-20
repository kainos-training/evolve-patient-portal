const db = require('../db');

exports.updateUserDetails = function(req, res) {
    var email = req.body.email;
    var preferredName = req.body.preferredName;
    var address = req.body.address;
    var mobilePhoneNumber = req.body.mobilePhoneNumber;
    var homePhoneNumber = req.body.homePhoneNumber;
    var workPhoneNumber = req.body.workPhoneNumber;
    var gpID = req.body.gpID;
    var userID = req.body.userID;
    console.log("gpID: "+gpID);
    console.log("user ID:" + userID);

    db.query('Update User SET email=?, preferredName=?, address=?, mobilePhoneNumber=?, homePhoneNumber=?, workPhoneNumber=?, gpID=? WHERE userID=?;',
        [email, preferredName, address, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, gpID, userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    );
};
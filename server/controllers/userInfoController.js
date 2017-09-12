const db = require('../db');

exports.getUserInfoByUserID = function(req, res) {
    let userID = req.body.userID;
    db.selectUserInfoByUserID(userID, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(rows));
        }
    })
};
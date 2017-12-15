const db = require('../db');
const emailer = require('../emailer');
const moment = require('moment');

exports.getTaskByDueDate = function (dueDate) {
    let dayPlusOne = moment().add(1, 'days').toDate();
    let dayPlusSeven = moment().add(7, 'days').toDate();
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT Task.taskName, Task.dueDate, User.firstName, User.lastName, User.email, User.mobilePhoneNumber FROM Task INNER JOIN User ON Task.userID = User.userID WHERE DATE(Task.dueDate) = DATE(?) OR DATE(Task.dueDate) = DATE(?);", [dayPlusOne, dayPlusSeven],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            }
        );
    });
};

exports.getUserContactDetails = function(userID){
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT mobilePhoneNumber, email FROM User WHERE userID=?", [userID],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            }
        );
    });
};

exports.getUser = function (req, res) {
    var userID = req.body.userID;
    var decryptedUserID = userID.replace(/[~]/g, '=');
    var buffer = new Buffer(decryptedUserID, 'base64');
    var realUserID = buffer.toString('ascii');

    db.query(
        "SELECT userID, username FROM User WHERE userID=?", [realUserID],
        function (err, rows) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password"
                });
            } else if (!rows[0]) {
                return res.status(400).json({
                    success: false,
                    message: "No account associated with that username"
                });
            } else {
                let user = {
                    userID: rows[0].userID,
                    username: rows[0].username,
                };
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully logged in!',
                    userID: user.userID,
                    username: user.username
                });
            }
        }
    );
};
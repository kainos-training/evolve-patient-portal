const db = require('../db');
const emailer = require('../emailer');

// for encrypting the passord;
var bcrypt = require('bcrypt');
//the salt to be used to hash the password
const saltRounds = 10;

// Update the user's password
exports.updatePassword = function(req, res) {
    let userID = req.body.userID.trim();
    let plainTextPassword = req.body.password.trim();

    //Creates the salt to be used
    var salt = bcrypt.genSaltSync(saltRounds);
    //Creates the hash of the plainTextPassword
    var hash = bcrypt.hashSync(plainTextPassword, salt);
    let password = hash;

    db.updateUserWithNewPasswordByUserID(password, userID, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log(err, rows);
        }
    });
};

exports.requestPasswordReset = function(req, res) {
    const username = req.body.username;
    db.selectRequestPasswordDetailsByUsername(username, function(err, rows) {
        if (err) throw err;
        if (rows.length == 1) {
            var stringUserId = rows[0].userID.toString();
            var bufferUserId = new Buffer(stringUserId);
            var base64UserId = bufferUserId.toString('base64').replace(/[=]/g, '~');

            emailer.sendNotification(rows[0].email, rows[0].name, base64UserId);
            return res.status(200).json({
                success: true,
                userID: rows[0].userID,
                message: 'Reset Password Email has been sent'
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No account associated with that username"
            });
        }
    });
};

exports.getUser = function(req, res) {
    var userID = req.body.userID;

    var decryptedUserID = userID.replace(/[~]/g, '=');

    var buffer = new Buffer(decryptedUserID, 'base64');
    var realUserID = buffer.toString('ascii');

    db.selectRequestPasswordDetailsByRealUserID(realUserID, function(err, rows) {
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
            }
            return res.status(200).json({
                success: true,
                message: 'You have successfully logged in!',
                userID: user.userID,
                username: user.username
            });
        }
    });
};
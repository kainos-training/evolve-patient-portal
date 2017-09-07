const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');
var utilsJWT = require('../utils/jwt');

// for encrypting the passord;
var bcrypt = require('bcrypt');
//the salt to be used to hash the password
const saltRounds = 10;


// Update the user's password
exports.updatePassword = function(req, res) {

        let userID = req.body.userID.trim();
        console.log("user: " + userID + " is changing password...");
        let plainTextPassword = req.body.password.trim();
    
        //Creates the salt to be used
        var salt = bcrypt.genSaltSync(saltRounds);
        //Creates the hash of the plainTextPassword
        var hash = bcrypt.hashSync(plainTextPassword, salt);
        let password = hash;
    
        db.query(
            "UPDATE User SET `password` = ? WHERE `userID` = ? ", [password, userID],
            function(err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(err, rows);
                }
    
            });
    };
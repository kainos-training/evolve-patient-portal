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
        let plainTextPassword = req.body.password.trim();
    
        //Creates the salt to be used
        var salt = bcrypt.genSaltSync(saltRounds);
        //Creates the hash of the plainTextPassword
        var hash = bcrypt.hashSync(plainTextPassword, salt);
        let password = hash;
        resetPass(userID, password).then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    };


   exports.resetPass = function(password, userID){
        return new Promise(function(resolve, reject){
            db.query(
                "UPDATE User SET `password` = ? WHERE `userID` = ? ", [password, userID],
                function(err, rows) {
                    if (err) {
                        //reject(err);
                        return res.status(400).json({
                            success: false,
                            message: "invalid password alternative"
                        });
                    } else {
                        resolve(rows);
                        return res.status(200).json({
                            success: true,
                            message: 'You have successfully changed your password!',
                            userID: user.userID,
                            username: user.username
                        });
                    }
                });
        });
    }
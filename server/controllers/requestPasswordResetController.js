const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');

exports.requestPasswordReset = function (req, res){
    
        const username = req.body.username;
        db.query(
            "SELECT email, CONCAT(firstName, ' ', lastName) AS name, userID FROM User WHERE username = ?",
            [username],
            function(err, rows) {
                if(err) throw err;
                if(rows.length==1){    
                    var stringUserId = rows[0].userID.toString();
                    var bufferUserId = new Buffer(stringUserId);
                    var base64UserId = bufferUserId.toString('base64').replace(/[=]/g,'~');
    
                    emailer.sendNotification(rows[0].email,rows[0].name, base64UserId);
                    return res.status(200).json({
                        success: true,
                        userID: rows[0].userID,
                        message: 'Reset Password Email has been sent'
                    });
                }else{
                    return res.status(400).json({
                        success: false,
                        message: "No account associated with that username"
                    });
                }
            }
        );
    };
    
    exports.getUser = function (req, res){
        
            var userID = req.body.userID;

            var decryptedUserID = userID.replace(/[~]/g,'=');

            var buffer = new Buffer(decryptedUserID, 'base64');
            var realUserID = buffer.toString('ascii');
            
            db.query(
                "SELECT userID, username FROM User WHERE userID=?", [realUserID],
                function(err, rows) {
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
                }
            );
        };
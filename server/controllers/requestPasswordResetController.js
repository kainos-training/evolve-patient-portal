const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');

exports.requestPasswordReset = function (req, res){
    
        console.log('Entered requestPasswordReset');
        const username = req.body.username;
        console.log('Username: ' + username);
        db.query(
            "SELECT email, CONCAT(firstName, ' ', lastName) AS name, userID FROM User WHERE username = ?",
            [username],
            function(err, rows) {
                if(err) throw err;
                if(rows.length==1){
                    console.log("database Id is: "+ rows[0].userID);
    
                    var stringUserId = rows[0].userID.toString();
                    var bufferUserId = new Buffer(stringUserId);
                    var base64UserId = bufferUserId.toString('base64').replace(/[=]/g,'~');
    
                    emailer.sendNotification(rows[0].email,rows[0].name, base64UserId);
                    console.log("Sent Email");
                    return res.status(200).json({
                        success: true,
                        userID: rows[0].userID,
                        message: 'Reset Password Email has been sent'
                    });
                }else{
                    console.log("{exists:false}");
                    return res.status(400).json({
                        success: false,
                        message: "No account associated with that username"
                    });
                }
            }
        );
    };
    
    exports.getUser = function (req, res){
        
            console.log('Entered get user');
            var userID = req.body.userID;

            console.log('UserId before ~ replace: ' + userID);
            var decryptedUserID = userID.replace(/[~]/g,'=');

            console.log('UserId after ~ replace: ' + decryptedUserID);
            var buffer = new Buffer(decryptedUserID, 'base64');
            var realUserID = buffer.toString('ascii');
            
            console.log('UserId decrpyted: ' + realUserID);
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
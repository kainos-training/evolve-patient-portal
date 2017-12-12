const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');

exports.preOpPrompt = function (req, res) {
    function addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }
    var prompt7Date = addDays(Date(), 7);

    db.query(
        "SELECT userID  FROM Tasks WHERE dueDate =?", [prompt7Date],
        function (err, rows) {
            if (err) throw err;
            for(i = 0; i <= )
            var stringUserId = rows[0].userID.toString();
            var bufferUserId = new Buffer(stringUserId);
            var base64UserId = bufferUserId.toString('base64').replace(/[=]/g, '~');

            emailer.sendNotification(rows[0].email, rows[0].name, base64UserId, "notify", "", "", "", "");
            return res.status(200).json({
                success: true,
                userID: rows[0].userID,
                message: 'Reset Password Email has been sent'
            });
        }           
    }
    
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
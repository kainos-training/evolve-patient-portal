const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');

exports.preOpPrompt = function (req, res) {
   
    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
   
    function getPromptDate(daysInAdvance) {
        var currentDate = new Date();
        currentDate.addDays(daysInAdvance);
        var n = currentDate.toISOString();
        n = n.slice(0, -14);
        return n;
    }

    function truncateDbDate(dbDate){
        dbDate = dbDate.slice(0, -9);
        return dbDate;
    }
    
}
    
    exports.getAppointmentsForNotification = function (req, res){
    db.query(
        "SELECT userID  FROM Tasks WHERE dueDate =?", [this.getPromptDate(7)],
        function (err, rows) {
            if (err) throw err;
            return res.status(200).send(rows);
        }              
    );
}
    exports.getAppointmentsFromDates = function(req, res){
        var passedRow = getAppointmentsForNotification();
        // for(i = 0; i < passedRow.length; i++){
        //     db.query(
        //         "SELECT userID  FROM Tasks WHERE dueDate =?", [passedRow[i]],
        //         function (err, rows) {
        //             if (err) throw err;
        //             return res.status(200).send(rows);
        //         }         
        //     );
        // };
    }

    exports.getAppointmentInfo = function(){

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
        }
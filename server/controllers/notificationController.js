const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');

exports.preOpPrompt = function (req, res) {
   
    
    
}
  
       
    
    exports.getAppointmentsForNotification = function (callback){

        console.log(getPromptDate(7));

}
    exports.getAppointmentsFromID = function(callback){
        Date.prototype.addDays = function(days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        }
         getPromptDate = function(daysInAdvance) {
            var currentDate = new Date();
            currentDate.addDays(daysInAdvance);
            var n = currentDate.toISOString();
            n = n.slice(0, -14);
            return n;
        }
         truncateDbDate = function(dbDate){
            dbDate = dbDate.slice(0, -9);
            return dbDate;
        }
        db.query(
            "SELECT userID, taskName FROM Task WHERE dueDate = '2017-12-19 00:01:00' ;", [getPromptDate(7)],
            function (err, rows) {
                if (err){
                     throw err;
                }
                else{ 
                    var r = [];
                    console.log(rows[0].userID);
                    for(i = 0; i<rows.length; i++){
                        r.push(rows[i].userID);
                    }
                    callback(r);
                }
            }              
        );
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
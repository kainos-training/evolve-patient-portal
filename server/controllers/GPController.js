const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');

exports.getAllGPPractice = function(req, res) {
    db.query( 'SELECT gpPracticeID, gpPracticeName, gpPracticeAddress FROM GPPractice',
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
};


exports.getAllGPbyPracticeID = function(req, res) {
    let gpPracticeID = req.body.gpPracticeID;
    db.query( 'SELECT gpID, gpFullName FROM GP WHERE gpPracticeID = ?',
    [gpPracticeID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
};
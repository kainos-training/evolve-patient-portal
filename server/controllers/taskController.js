const db = require('../db');
const bodyParser = require('body-parser');

exports.getListOfTasks = function(req, res) {
    const userID = req.body.userID;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getTaskList(userID, function(err, rows) {
            if (err) {
                res.status(400).json({
                    success: false
                });
            } else {
                console.log(rows);
                res.status(200).send(rows);
            }
        });
    }
};
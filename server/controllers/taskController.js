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

exports.insertAnswer = function(req, res) {
    const taskID = req.body.taskID;
    const answer = JSON.stringify(req.body.answer);
    console.log(answer);

    if (taskID == null) {
        res.status(400).json({
            success: false
        });
    } if (answer == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.insertAnswer(taskID, answer, function(err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    "reason":err
                });
            } else {
                res.status(200).json({
                    success: true
                });
            }
        });
    }
};
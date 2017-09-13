const db = require('../db');

exports.getCurrentConditions = function(req, res) {
    const userID = req.body.userID;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getCurrentConditions(userID, function(err, rows) {
            if (err) {
                res.status(400).json({
                    success: false
                });
            } else {
                res.status(200).send(rows);
            }
        });
    }
};

exports.getPreviousConditions = function(req, res) {
    const userID = req.body.userID;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getPreviousConditions(userID, function(err, rows) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    success: false
                });
            } else {
                res.status(200).send(rows);
            }
        });
    }
};
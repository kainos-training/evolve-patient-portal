const db = require('../db');
const request = require('request');

exports.updatePrescriptionDate = function(req, res) {
    const medicationUserID = req.body.medicationUserID.trim();

    if (medicationUserID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.updatePrescribedDate(medicationUserID, function(err) {
            if (err) {
                res.status(400).json({
                    success: false
                });
            } else {
                res.status(200).json({
                    success: true
                });

            }
        });
    }
};

exports.repeatedMedication = function(req, res) {
    const userID = req.params.userID;
    console.log(req.params.userID);
    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getRepeatedMedication(userID, function(err, rows) {
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

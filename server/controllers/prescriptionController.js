const db = require('../db');
const request = require('request');

exports.updatePrescriptionDate = function(req, res) {
    const medicationUserIDs = req.body.medicationUserIDs;
    const deliveryStatus = req.body.deliveryStatus;
    if (medicationUserIDs == null || deliveryStatus == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.updatePrescribedDate(medicationUserIDs, deliveryStatus, function(err) {
            console.log(medicationUserIDs);
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
    const userID = req.body.userID
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

exports.localPharmacy = function(req, res) {
    const userID = req.body.userID
    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getLocalPharmacy(userID, function(err, rows) {
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

const db = require('../db');
const request = require('request');

exports.updatePrescriptionDate = function(req, res) {
    const medicationUserIDs = req.body.medicationUserIDs;
    const deliveryStatus = req.body.deliveryStatus;
    const collectionAddress = req.body.collectionAddress;
    const medicationID = req.body.medicationID;
    if (medicationUserIDs == null || deliveryStatus == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.updatePrescribedDate(medicationUserIDs, deliveryStatus,collectionAddress, medicationID, function(err) {
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
    console.log("PHARMACY USERID: " + userID)
    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        console.log("PREPARING QUERY")
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

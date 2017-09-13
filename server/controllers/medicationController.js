const db = require('../db');
const request = require('request');
const xml = require("node-xml-lite");
const wikiAPIurl = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=xml&exintro=&titles=";

exports.getListOfMedications = function (req, res) {
    const userID = req.body.userID;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getMedications(userID, function (err, rows) {
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

exports.addMedicationUserComment = function (req, res) {
    const medicationUserID = req.body.medicationUserID;
    const commentText = req.body.commentText;

    if (medicationUserID == null) {
        res.status(400).json({
            success: false
        });
    } else if (commentText == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.insertComment(medicationUserID, commentText, function (err) {
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

exports.getListOfMedicationUserComments = function (req, res) {
    const medicationUserID = req.body.medicationUserID;

    if (medicationUserID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getMedicationUserComments(medicationUserID, function (err, rows) {
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

exports.getUserSideEffects = function(req, res) {
    const userID = req.body.userID;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getUserSideEffects(userID, function(err, rows) {
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

exports.getListOfRemovedMedicationUserComments = function (req, res) {
    const medicationUserID = req.body.medicationUserID;
    if (medicationUserID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getRemovedMedicationUserComments(medicationUserID, function (err, rows) {
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

exports.removeMedicationUserComment = function(req, res) {
    const medicationUserCommentID = req.body.medicationUserCommentID;

    if (medicationUserCommentID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.removeComment(medicationUserCommentID, function (err) {
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

exports.removeUserSideEffect = function(req, res){
    const userSideEffectID = req.body.userSideEffectID;
    
        if (userSideEffectID == null) {
            res.status(400).json({
                success: false
            });
        } else {
            db.removeSideEffect(userSideEffectID, function(err) {
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

exports.addUserSideEffect = function(req, res) {
    const userID = req.body.userID;
    const commentText = req.body.commentText;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else if (commentText == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.addSideEffect(userID, commentText, function(err) {
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

exports.getWikiMedicationDescription = function(req, res) {
    const medicationName = req.body.medicationName;

    if (medicationName == null) {
        res.status(400).json({
            success: false
        });
    } else {

        let requestOptions = {
            uri: wikiAPIurl + medicationName,
            method: "POST",
            json: true
        }

        request(requestOptions, function (err, httpResponse, body) {
            const returnData = {
                // Note(Dariusz J.): 
                // xml.parseString.childs[0].... is due to format of how data is pulled from wikipedia API.
                // We only need one filed therefore we get only necessary data to post to front end => it is easier to handle it on the client side.
                // For more info, refer to wikipedia API documentation.
                "description": xml.parseString("<xml>" + body + "</xml>").childs[0].childs[0].childs[0].childs[0].childs[0].childs[0]
            };
            res.status(200).send(returnData);
        });
    }
};

exports.getMedicationHistory = function (req, res) {
    const medicationID = req.body.medicationID;
    const userID = req.body.userID;

    if (medicationID == null || userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getMedicationHistory(medicationID, userID, function (err, rows) {
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
const express = require('express');
const publicUserInfoRoute = express.Router();
const appointmentController = require('../controllers/dependantController');

publicUserInfoRoute.post('/getDependantInformation', function(req, res){
    return appointmentController.getDependantInformation(req, res);
});

publicUserInfoRoute.post('/getAllDependants', function(req, res){
    return appointmentController.getAllDependants(req, res);
});

module.exports = publicUserInfoRoute;
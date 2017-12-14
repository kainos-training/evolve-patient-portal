const express = require('express');
const protectedGPRoutes = express.Router();
const GPController = require('../controllers/GPController');

protectedGPRoutes.post('/getAllGPPractice', function(req, res){
    return GPController.getAllGPPractice(req, res);
});

protectedGPRoutes.post('/getAllGPbyPracticeID', function(req, res){
    return GPController.getAllGPbyPracticeID(req, res);
});

module.exports = protectedGPRoutes;
const express = require('express');
const publicUserInfoRoute = express.Router();
const appointmentController = require('../controllers/userInfoController');

publicUserInfoRoute.post('/getUserInfoByUserID', function(req, res){
    return appointmentController.getUserInfoByUserID(req, res);
});

module.exports = publicUserInfoRoute;
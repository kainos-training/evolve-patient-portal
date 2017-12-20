const express = require('express');
const publicUserRoutes = express.Router();
const userController = require('../controllers/userController');

publicUserRoutes.post('/updateUserDetails', function(req, res){
    return userController.updateUserDetails(req, res);
});

module.exports = publicUserRoutes;
const express = require('express');
const publicAuthRoutes = express.Router();
const authController = require('../controllers/authController');

publicAuthRoutes.post('/login', function(req, res) {
    return authController.login(req, res);
});

publicAuthRoutes.post('/signup', function(req, res) {
    return authController.createUserAccount(req, res);
});

publicAuthRoutes.post('/user', function(req, res) {
    console.log('In public routes');
    return authController.requestPasswordReset(req, res);
});

publicAuthRoutes.post('/getUser', function(req, res) {
    console.log('In get user route');
    return authController.getUser(req, res);
});

module.exports = publicAuthRoutes;

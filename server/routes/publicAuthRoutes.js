const express = require('express');
const publicAuthRoutes = express.Router();
const authController = require('../controllers/authController');

publicAuthRoutes.post('/login', function(req, res) {
    return authController.login(req, res);
});

publicAuthRoutes.post('/signup', function(req, res) {
    return authController.createUserAccount(req, res);
});

module.exports = publicAuthRoutes;

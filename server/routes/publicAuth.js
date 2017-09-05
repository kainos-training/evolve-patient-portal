const express = require('express');
const publicAuthRoutes = express.Router();
const authController = ('./controllers/authController');

//login to account
publicAuthRoutes.post('/login', function(req, res) {
    return authController.login(req, res);
});

publicAuthRoutes.post('/register', function(req, res) {

});


module.exports = publicAuthRoutes;

const express = require('express');
const publicAuthRoutes = express.Router();
const authController = ('./controllers/authController');


publicAuthRoutes.post('/login', function(req, res) {
    return authController.login(req, res);
});


module.export = publicAuthRoutes;

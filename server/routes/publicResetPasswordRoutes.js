const express = require('express');
const publicResetPasswordRoutes = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

publicResetPasswordRoutes.post('/reset', function(req, res) {
    return resetPasswordController.updatePassword(req, res);
});

module.exports = publicResetPasswordRoutes;

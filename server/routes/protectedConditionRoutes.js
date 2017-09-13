const express = require('express');
const protectedConditionRoutes = express.Router();
const conditionController = require('../controllers/conditionController');
const jwtUtils = require('../utils/jwt');

// Binding JWT verify middleware to protected routes
protectedConditionRoutes.use(jwtUtils.verifyToken);

protectedConditionRoutes.post('/current', function(req, res) {
    return conditionController.getCurrentConditions(req, res);
});

protectedConditionRoutes.post('/previous', function(req, res) {
    return conditionController.getPreviousConditions(req, res);
});

module.exports = protectedConditionRoutes;
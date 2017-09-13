const express = require('express');
const protectedConditionRoutes = express.Router();
const conditionController = require('../controllers/conditionController');

protectedConditionRoutes.post('/current', function(req, res) {
    return conditionController.getCurrentConditions(req, res);
});

protectedConditionRoutes.post('/previous', function(req, res) {
    return conditionController.getPreviousConditions(req, res);
});

module.exports = protectedConditionRoutes;
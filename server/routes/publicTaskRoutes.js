const express = require('express');
const publicTaskRoutes = express.Router();
const taskController = require('../controllers/taskController');

publicTaskRoutes.post('/list', function(req, res) {
    return taskController.getListOfTasks(req, res);
});

publicTaskRoutes.post('/answer', function(req, res) {
    return taskController.insertAnswer(req, res);
});

module.exports = publicTaskRoutes;
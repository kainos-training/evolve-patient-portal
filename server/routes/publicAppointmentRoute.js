const express = require('express');
const publicAppointmentRoute = express.Router();
const appointmentController = require('../controllers/appointmentController');

publicAppointmentRoute.get('/appointmentInfo', function(req, res) {
    return appointmentController.getAppointmentInfoOrderByDate(req, res);
});

module.exports = publicAppointmentRoute;

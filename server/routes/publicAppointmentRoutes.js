const express = require('express');
const publicAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');

publicAppointmentRoutes.get('/appointmentInfo', function(req, res) {
    return appointmentController.getAppointmentInfoOrderByDate(req, res);
});

module.exports = publicAppointmentRoutes;

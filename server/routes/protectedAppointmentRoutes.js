const express = require('express');
const protectedAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');

protectedAppointmentRoutes.post('/getAllAppointmentsByUserID', function(req, res) {
    return appointmentController.getAllAppointmentsByUserID(req, res);
});

protectedAppointmentRoutes.post('/getAppointmentFurtherInfo', function(req, res) {
    return appointmentController.getAppointmentFurtherInfo(req, res);
});

protectedAppointmentRoutes.post('/previous', function(req, res) {
    return appointmentController.getPreviousAppointments(req, res);
});

protectedAppointmentRoutes.post('/getUserClinicians', function(req, res) {
    return appointmentController.getUserClinicians(req, res);
});

protectedAppointmentRoutes.post('/addAppointmentQuery', function(req, res) {
    return appointmentController.addAppointmentQuery(req, res);
});

protectedAppointmentRoutes.post('/changeAppointment', function(req, res) {
    return appointmentController.changeAppointment(req, res);
});

protectedAppointmentRoutes.post('/deleteAppointment', function(req, res) {
    return appointmentController.deleteAppointment(req, res);
});

module.exports = protectedAppointmentRoutes;
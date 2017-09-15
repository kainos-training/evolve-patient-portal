const express = require('express');
const protectedAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');

protectedAppointmentRoutes.post('/getAllAppointmentsByUserID', function(req, res){
    return appointmentController.getAllAppointmentsByUserID(req, res);
});

protectedAppointmentRoutes.post('/getAppointmentFurtherInfo',function(req,res){
    return appointmentController.getAppointmentFurtherInfo(req,res);
});

protectedAppointmentRoutes.post('/previous', function(req, res) {
    return appointmentController.getPreviousAppointments(req, res);
});

module.exports = protectedAppointmentRoutes;

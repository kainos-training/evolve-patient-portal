const express = require('express');
const protectedAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');
const jwtUtils = require('../utils/jwt');

// Binding JWT verify middleware to protected routes
protectedAppointmentRoutes.use(jwtUtils.verifyToken);

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

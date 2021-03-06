const express = require('express');
const publicAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');

publicAppointmentRoutes.post('/getAllAppointmentsByUserID', function(req, res){
    return appointmentController.getAllAppointmentsByUserID(req, res);
});

publicAppointmentRoutes.post('/getAppointmentFurtherInfo',function(req,res){
    return appointmentController.getAppointmentFurtherInfo(req,res);
});

module.exports = publicAppointmentRoutes;

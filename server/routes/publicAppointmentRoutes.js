const express = require('express');
const publicAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');

publicAppointmentRoutes.post('/getAllAppointmentsByUserID', function(req, res){
    return appointmentController.getAllAppointmentsByUserID(req, res);
});

publicAppointmentRoutes.post('/getAppointmentFurtherInfo',function(req,res){
    return appointmentController.getAppointmentFurtherInfo(req,res);
});

publicAppointmentRoutes.post('/getUserClinicians', function(req, res){
    return appointmentController.getUserClinicians(req, res);
});

publicAppointmentRoutes.post('/addAppointmentQuery', function(req, res) {
    console.log("getting to add appointment query route");
    return appointmentController.addAppointmentQuery(req, res);
});

module.exports = publicAppointmentRoutes;

const express = require('express');
const protectedAppointmentRoutes = express.Router();
const appointmentController = require('../controllers/appointmentController');
const notificationController = require('../controllers/notificationController');

protectedAppointmentRoutes.post('/getAllAppointmentsByUserID', function(req, res){
    return appointmentController.getAllAppointmentsByUserID(req, res);
});

protectedAppointmentRoutes.post('/getAppointmentFurtherInfo',function(req,res){
    return appointmentController.getAppointmentFurtherInfo(req,res);
});

protectedAppointmentRoutes.post('/previous', function(req, res) {
    return appointmentController.getPreviousAppointments(req, res);
});

protectedAppointmentRoutes.post('/getUserClinicians', function(req, res){
    return appointmentController.getUserClinicians(req, res);
});

protectedAppointmentRoutes.post('/addAppointmentQuery', function(req, res) {
    return appointmentController.addAppointmentQuery(req, res);
});

<<<<<<< HEAD
protectedAppointmentRoutes.post('/changeAppointment', function(req, res) {
    return appointmentController.changeAppointment(req, res);
});

protectedAppointmentRoutes.post('/deleteAppointment', function(req, res) {
    return appointmentController.deleteAppointment(req, res);
});

=======
+protectedAppointmentRoutes.post('/addAppointment', function(req, res) {
      return appointmentController.addAppointment(req, res);
    });
>>>>>>> 9667fced132cb56b95b7ab14af57f7ed0d6405ef
module.exports = protectedAppointmentRoutes;

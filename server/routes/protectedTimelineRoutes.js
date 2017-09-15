const express = require('express');
const protectedTimelineRoutes = express.Router();
const timelineController = require('../controllers/timelineController');
const jwtUtils = require('../utils/jwt');

// Binding JWT verify middleware to protected routes
protectedTimelineRoutes.use(jwtUtils.verifyToken);

protectedTimelineRoutes.post('/getTimelineAppointments', function(req, res){
    return timelineController.getTimelineAppointments(req, res);
});

protectedTimelineRoutes.post('/countTimelineAppointmentsPrevious', function(req, res){
    return timelineController.countTimelineAppointmentsPrevious(req, res);
});

protectedTimelineRoutes.post('/countTimelineAppointmentsFuture', function(req, res){
    return timelineController.countTimelineAppointmentsFuture(req, res);
});

module.exports = protectedTimelineRoutes;
const express = require('express');
const protectedTimelineRoutes = express.Router();
const timelineController = require('../controllers/timelineController');

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
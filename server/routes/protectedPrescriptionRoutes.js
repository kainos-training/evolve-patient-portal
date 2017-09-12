const express = require('express');
const protectedPrescriptionRoutes = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

protectedPrescriptionRoutes.post('/updatePrescribedDate', function(req, res) {
    return prescriptionController.updatePrescriptionDate(req, res);
});

protectedPrescriptionRoutes.get('/repeatedMedication/:userID', function(req, res) {
    return prescriptionController.repeatedMedication(req, res);
});

module.exports = protectedPrescriptionRoutes;

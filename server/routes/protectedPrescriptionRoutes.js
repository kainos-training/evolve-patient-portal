const express = require('express');
const protectedPrescriptionRoutes = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

protectedPrescriptionRoutes.post('/updatePrescribedDate', function(req, res) {
    console.log("INSIDE ROUTE");
    return prescriptionController.updatePrescriptionDate(req, res);
});

protectedPrescriptionRoutes.post('/repeatedMedication', function(req, res) {
    return prescriptionController.repeatedMedication(req, res);
});

protectedPrescriptionRoutes.post('/pharmacy', function(req, res) {
    return prescriptionController.localPharmacy(req, res);
});

module.exports = protectedPrescriptionRoutes;

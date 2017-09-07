const express = require('express');
const protectedMedicationRoutes = express.Router();
const medicationController = require('../controllers/medicationController');

protectedMedicationRoutes.post('/list', function(req, res) {
    return medicationController.getListOfMedications(req, res);
});

protectedMedicationRoutes.post('/comments/add', function(req, res) {
    return medicationController.addMedicationUserComment(req, res);
});

protectedMedicationRoutes.post('/comments/list', function(req, res) {
    return medicationController.getListOfMedicationUserComments(req, res);
});

protectedMedicationRoutes.post('/comments/remove', function(req, res) {
    return medicationController.removeMedicationUserComment(req, res);
});

protectedMedicationRoutes.post('/wiki/desc', function(req, res) {
    return medicationController.getWikiMedicationDescription(req, res);
});

protectedMedicationRoutes.post('/history', function(req, res) {
    return medicationController.getMedicationHistory(req, res);
});

module.exports = protectedMedicationRoutes;

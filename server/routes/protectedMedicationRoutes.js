const express = require('express');
const protectedMedicationRoutes = express.Router();
const medicationController = require('../controllers/medicationController');
const jwtUtils = require('../utils/jwt');

// Binding JWT verify middleware to protected routes
protectedMedicationRoutes.use(jwtUtils.verifyToken);

protectedMedicationRoutes.post('/list', function(req, res) {
    return medicationController.getListOfMedications(req, res);
});

protectedMedicationRoutes.post('/comments/add', function(req, res) {
    return medicationController.addMedicationUserComment(req, res);
});

protectedMedicationRoutes.post('/comments/list', function(req, res) {
    return medicationController.getListOfMedicationUserComments(req, res);
});

protectedMedicationRoutes.post('/comments/removedList', function(req, res) {
    return medicationController.getListOfRemovedMedicationUserComments(req, res);
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

protectedMedicationRoutes.post('/side-effects', function(req, res) {
    return medicationController.getUserSideEffects(req, res);
});

protectedMedicationRoutes.post('/side-effects/remove', function(req, res) {
    return medicationController.removeUserSideEffect(req, res);
});

protectedMedicationRoutes.post('/side-effects/add', function(req, res) {
    return medicationController.addUserSideEffect(req, res);
});

module.exports = protectedMedicationRoutes;

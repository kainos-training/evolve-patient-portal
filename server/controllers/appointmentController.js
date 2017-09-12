const db = require('../db');

exports.getAllAppointmentsByUserID = function(req, res) {
    let userID = req.body.userID;
    db.selectAllAppointments(userID, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(rows));
        }
    });
};

exports.getAppointmentFurtherInfo = function(req, res) {
    let appointmentID = req.body.appointmentID;
    db.selectAllAppointmentsExtended(appointmentID, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(rows));
        }
    })
};
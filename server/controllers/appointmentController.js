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
    )
};

exports.getPreviousAppointments = function(req, res) {
    let userID = req.body.userID;
    db.query(
        "Select Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, " +
        "`User`.userID, `User`.firstName, `User`.lastName, Appointment.appointmentID " +
        "FROM `User` JOIN Appointment on `User`.userID = Appointment.userID " +
        "JOIN AppointmentType on AppointmentType.appointmentTypeID = Appointment.appointmentTypeID " +
        "JOIN LocationDepartment ON LocationDepartment.locationDepartmentID = Appointment.locationDepartmentID " +
        "JOIN Department ON Department.departmentID = LocationDepartment.departmentID " +
        "WHERE `User`.userID = ? AND Appointment.dateOfAppointment < NOW()" +
        "ORDER BY Appointment.dateOfAppointment DESC; ", 
        [userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
};
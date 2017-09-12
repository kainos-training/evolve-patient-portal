const db = require('../db');

exports.getAllAppointmentsByUserID = function(req, res) {
    let userID = req.body.userID;
    db.query(
        "Select Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, " +
        "`User`.userID, `User`.firstName, `User`.lastName, Appointment.appointmentID " +
        "FROM `User`JOIN Appointment on `User`.userID = Appointment.userID " +
        "JOIN AppointmentType on AppointmentType.appointmentTypeID = Appointment.appointmentTypeID " +
        "JOIN LocationDepartment ON LocationDepartment.locationDepartmentID = Appointment.locationDepartmentID " +
        "JOIN Department ON Department.departmentID = LocationDepartment.departmentID " +
        "WHERE `User`.userID = ? AND Appointment.dateOfAppointment > NOW()" +
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

exports.getAppointmentFurtherInfo = function(req, res) {
    //let userID = req.body.userID;
    let appointmentID = req.body.appointmentID;
    db.query(
        "SELECT Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, `User`.userID, " +
        "CONCAT (Clinician.title, ' ' ,Clinician.firstName, ' ', Clinician.lastName) AS clinicianName, Appointment.comment, Location.locationAddress " +
        "FROM `User`JOIN Appointment on `User`.userID = Appointment.userID " +
        "JOIN AppointmentType on AppointmentType.appointmentTypeID = Appointment.appointmentTypeID " +
        "JOIN LocationDepartment ON LocationDepartment.locationDepartmentID = Appointment.locationDepartmentID " +
        "JOIN Department ON Department.departmentID = LocationDepartment.departmentID " +
        "JOIN Clinician ON Clinician.clinicianID = Appointment.clinicianID " +
        "JOIN Location ON Location.locationID = LocationDepartment.locationID " +
        "WHERE Appointment.appointmentID = ?; ",
        [appointmentID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
};
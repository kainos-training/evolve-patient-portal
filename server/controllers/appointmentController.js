const db = require('../db');

exports.getAllAppointmentsByUserID = function(req, res) {
    let userID = req.body.userID;
    db.query(
        "Select Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, " +
        "`User`.userID, `User`.firstName, `User`.lastName, Appointment.appointmentID " +
        "FROM `User` JOIN Appointment on `User`.userID = Appointment.userID " +
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
    let appointmentID = req.body.appointmentID;
    db.query(
        "SELECT Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, `User`.userID, Department.departmentID, Location.locationID, " +
        "CONCAT (Clinician.title, ' ' ,Clinician.firstName, ' ', Clinician.lastName) AS clinicianName, Appointment.comment, Location.locationAddress " +
        "FROM `User` JOIN Appointment on `User`.userID = Appointment.userID " +
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

exports.getUserClinicians = function(req, res) {
    const userID = req.body.userID;

    if (userID == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.getUserClinicians(userID, function(err, rows) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    success: false
                });
            } else {
                res.status(200).send(rows);
            }
        });
    }
};

exports.addAppointmentQuery = function(req, res) {
    const appointmentID = req.body.appointmentID;
    const clinicianID = req.body.clinicianID;
    const querySubject = req.body.querySubject;
    const queryText = req.body.queryText;

    if (appointmentID == null || clinicianID == null || querySubject == null || queryText == null) {
        res.status(400).json({
            success: false
        });
    } else {
        db.addAppointmentQuery(appointmentID, clinicianID, querySubject, queryText, function(err) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    success: false
                });
            } else {
                res.status(200).send("success");
            }
        });
    }
};
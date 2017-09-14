const db = require('../db');

exports.getTimelineAppointments = function(req,res) {
    let userID = req.body.userID;
    let intervalBefore = req.body.intervalBefore;
    let intervalAfter = req.body.intervalAfter;
    db.query(
        "SELECT Department.departmentName, AppointmentType.`type`, Appointment.dateOfAppointment, "+
        "MONTHNAME(Appointment.dateOfAppointment) AS dateMonth, " +
        "YEAR(Appointment.dateOfAppointment) AS dateYear, " +
        "MONTH(Appointment.dateOfAppointment)-1 AS dateMonthNumber " +
        "FROM `User` JOIN Appointment ON `User`.userID = Appointment.userID " +
        "JOIN AppointmentType ON AppointmentType.appointmentTypeID = Appointment.appointmentTypeID " +
        "JOIN LocationDepartment ON LocationDepartment.locationDepartmentID = Appointment.locationDepartmentID " +
        "JOIN Department ON Department.departmentID = LocationDepartment.departmentID " +
        "WHERE `User`.userID = ? " +
        "AND Appointment.dateOfAppointment < NOW() + INTERVAL ? YEAR AND Appointment.dateOfAppointment > NOW() - INTERVAL ? YEAR " +
        "ORDER BY Appointment.dateOfAppointment ASC; " ,
        [userID,intervalBefore,intervalAfter],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )

};

exports.countTimelineAppointmentsPrevious = function(req,res) {
    let appCount = req.body.appCount;
    let userID = req.body.userID;
    db.query(
        "SELECT count(*) AS appCount FROM (SELECT distinct(YEAR(Appointment.dateOfAppointment)) FROM Appointment " +
        "WHERE YEAR(Appointment.dateOfAppointment + INTERVAL ? YEAR) < YEAR(NOW()) AND Appointment.userID = ? " +
        "ORDER BY YEAR(Appointment.dateOfAppointment))src; ",
        [appCount,userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {               
                res.send(JSON.stringify(rows));
            }
        }
    )

};

exports.countTimelineAppointmentsFuture = function(req,res) {
    let appCount = req.body.appCount;
    let userID = req.body.userID;
    db.query(
        "SELECT count(*) AS appCount FROM (select distinct(YEAR(Appointment.dateOfAppointment)) FROM Appointment " +
        "WHERE YEAR(Appointment.dateOfAppointment) > YEAR(NOW() + INTERVAL ? YEAR) AND Appointment.userID = ? " +
        "ORDER BY YEAR(Appointment.dateOfAppointment))src;",
        [appCount,userID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )

};


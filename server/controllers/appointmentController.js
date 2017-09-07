const db = require('../db');

exports.getAppointmentInfoOrderByDate = function(req, res) {
    db.query(
        "SELECT Department.departmentName, Appointment.dateOfAppointment, AppointmentType.type, User.userID " +
        "FROM Department JOIN LocationDepartment ON Department.departmentID = LocationDepartment.departmentID " +
        "JOIN Appointment ON Appointment.locationDepartmentID = LocationDepartment.locationDepartmentID " +
        "JOIN AppointmentType ON AppointmentType.appointmentTypeID " +
        "JOIN `User` ON `User`.userID = Appointment.UserID " +
        "WHERE `User`.userID = ? " +
        "ORDER BY Appointment.dateOfAppointment DESC;", [1],
        function(err, rows) {
            if (err) {
                console.log('error');
            } else {
                console.log(rows);
            }
        }
    )
};

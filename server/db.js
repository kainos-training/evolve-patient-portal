var mysql = require('mysql');
const config = require('./config');

const database = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

database.connect(function(err) {
    if (err) throw err;
});

database.getMedications = function(userID, callback) {
    database.query(
        "SELECT U.userID, " +
        "M.medicationID, M.medicationName, " +
        "MT.medicationType, " +
        "MU.startDate, MU.endDate, MU.dosage, MU.medicationUserID " +
        "FROM User AS U INNER JOIN MedicationUser AS MU ON U.userID = MU.userID " +
        "INNER JOIN Medication AS M ON MU.medicationID = M.medicationID " +
        "INNER JOIN MedicationType AS MT ON MT.medicationTypeID = M.medicationTypeID " +
        "WHERE U.userID = ? " +
        "AND MU.endDate >= NOW();", [userID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.insertComment = function(medicationUserID, commentText, callback) {
    database.query(
        "INSERT INTO MedicationUserComment (medicationUserID, commentText, timeStamp) VALUES (?, ?, CURRENT_TIMESTAMP);", [medicationUserID, commentText],
        function(err) {
            callback(err);
        });
}

database.getMedicationUserComments = function(medicationUserID, callback) {
    database.query(
        "SELECT medicationUserCommentID, commentText, `timeStamp` " +
        "FROM MedicationUserComment " +
        "WHERE medicationUserID = ?;", [medicationUserID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.removeComment = function(medicationUserCommentID, callback) {
    database.query(
        "DELETE FROM MedicationUserComment WHERE medicationUserCommentID = ?;", [medicationUserCommentID],
        function(err) {
            callback(err);
        });
};

database.getMedicationHistory = function(medicationID, userID, callback) {
    database.query(
        "SELECT * FROM MedicationUser " +
        "WHERE medicationID = ? " +
        "AND userID = ? " +
        "AND endDate < NOW();", [medicationID, userID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.getUserByUsername = (username, cb) => {
    database.query(
        "SELECT userID, password, firstName, lastName FROM User WHERE username=?", [username],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows)
            }
        }
    )
};

database.insertUserIntoDatabase = (userData, cb) => {
    database.query(
        "INSERT INTO User(username, `password`, dateOfBirth, gender, MRIN, firstName, lastName, phoneNumber, title, address, email, deceased, gpID)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [userData.username,
            userData.password,
            userData.dateOfBirth,
            userData.gender,
            userData.MRIN,
            userData.firstName,
            userData.lastName,
            userData.phoneNumber,
            userData.title,
            userData.address,
            userData.email,
            userData.deceased,
            userData.gpID
        ],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows)
            }
        }
    )
};

database.selectAllAppointments = (userID, cb) => {
    database.query(
        "Select Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, " +
        "`User`.userID, `User`.firstName, `User`.lastName, Appointment.appointmentID " +
        "FROM `User`JOIN Appointment on `User`.userID = Appointment.userID " +
        "JOIN AppointmentType on AppointmentType.appointmentTypeID = Appointment.appointmentTypeID " +
        "JOIN LocationDepartment ON LocationDepartment.locationDepartmentID = Appointment.locationDepartmentID " +
        "JOIN Department ON Department.departmentID = LocationDepartment.departmentID " +
        "WHERE `User`.userID = ? AND Appointment.dateOfAppointment > NOW()" +
        "ORDER BY Appointment.dateOfAppointment DESC; ", [userID],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows)
            }
        }
    )
};
module.exports = database;
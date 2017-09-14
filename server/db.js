var mysql = require('mysql');
// call dotenv.config here aswell as index.js because some unit tests enter here directly without accessing index.js
var dotenv = require('dotenv').config();

const database = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASENAME
});

database.connect(function(err) {
    if (err) throw err;
});

database.getMedications = function(userID, callback) {
    database.query(
        "SELECT userID, medicationID, medicationName, medicationType, startDate, endDate, dosage, instructions, prescribedDate, repeated " + 
        "FROM User NATURAL JOIN MedicationUser NATURAL JOIN Medication NATURAL JOIN MedicationType " +
        "WHERE userID = ? AND endDate >= NOW();", 
        [userID],
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
        "WHERE medicationUserID = ? AND deleted = false;", [medicationUserID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.getRemovedMedicationUserComments = function(medicationUserID, callback) {
    database.query(
        "SELECT medicationUserCommentID, commentText, `timeStamp` " +
        "FROM MedicationUserComment " +
        "WHERE medicationUserID = ? AND deleted = true;", [medicationUserID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.getUserSideEffects = function(userID, callback) {
    database.query(
        "SELECT userSideEffectID, userID, sideEffectText, `timeStamp`, deleted " +
        "FROM UserSideEffect " +
        "WHERE userID = ? order by `timestamp` desc;", [userID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.removeComment = function(medicationUserCommentID, callback) {
    database.query(
        "UPDATE MedicationUserComment SET deleted = true WHERE medicationUserCommentID = ?;", [medicationUserCommentID],
        function(err) {
            callback(err);
        });
};

database.removeSideEffect = function(userSideEffectID, callback) {
    database.query(
        "UPDATE UserSideEffect SET deleted = true WHERE userSideEffectID = ?;", [userSideEffectID],
        function(err) {
            callback(err);
        }
    );
};

database.addSideEffect = function(userID, commentText, callback) {
    database.query(
        "INSERT INTO UserSideEffect (userID, sideEffectText, deleted) VALUES (?, ?, false);", [userID, commentText],
        function(err) {
            callback(err);
        });
}

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
                cb(null, rows);
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
                cb(null, rows);
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
                cb(null, rows);
            }
        }
    )
};

database.selectAllAppointmentsExtended = (appointmentID, cb) => {
    database.query(
        "SELECT Department.departmentName, Appointment.dateOfAppointment, AppointmentType.`type`, `User`.userID, " +
        "CONCAT (Clinician.title, ' ' ,Clinician.firstName, ' ', Clinician.lastName) AS clinicianName, Appointment.comment, Location.locationAddress " +
        "FROM `User`JOIN Appointment on `User`.userID = Appointment.userID " +
        "JOIN AppointmentType on AppointmentType.appointmentTypeID = Appointment.appointmentTypeID " +
        "JOIN LocationDepartment ON LocationDepartment.locationDepartmentID = Appointment.locationDepartmentID " +
        "JOIN Department ON Department.departmentID = LocationDepartment.departmentID " +
        "JOIN Clinician ON Clinician.clinicianID = Appointment.clinicianID " +
        "JOIN Location ON Location.locationID = LocationDepartment.locationID " +
        "WHERE Appointment.appointmentID = ?; ", [appointmentID],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows);
            }
        }
    )
};

database.selectRequestPasswordDetailsByUsername = (username, cb) => {
    database.query(
        "SELECT email, CONCAT(firstName, ' ', lastName) AS name, userID FROM User WHERE username = ?", [username],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows);
            }
        }
    )
};

database.selectRequestPasswordDetailsByRealUserID = (realUserID, cb) => {
    database.query(
        "SELECT userID, username FROM User WHERE userID=?", [realUserID],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows);
            }
        }
    )
};

database.updateUserWithNewPasswordByUserID = (password, userID, cb) => {
    database.query(
        "UPDATE User SET `password` = ? WHERE `userID` = ? ", [password, userID],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows);
            }
        }
    )
};

database.selectUserInfoByUserID = (userID, cb) => {
    database.query(
        "SELECT userID, firstName, lastName, dateOfBirth, phoneNumber, title, gender, MRIN, address, email " +
        "FROM User " +
        "WHERE userID = ? ", [userID],
        function(err, rows) {
            if (err) {
                cb(err);
            } else {
                cb(null, rows);
            }
        }
    )
}

database.getCurrentConditions = function(userID, callback) {
    database.query(
        "SELECT UC.userID, UC.conditionID, UC.userConditionID, UC.startDate, UC.endDate, " +
        "C.conditionName, C.conditionLink " +
        "FROM UserCondition AS UC INNER JOIN `Condition` AS C ON UC.conditionID = C.conditionID " +
        "WHERE UC.userID = ? " +
        "AND UC.endDate IS NULL;", [userID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.getPreviousConditions = function(userID, callback) {
    database.query(
        "SELECT UC.userID, UC.conditionID, UC.userConditionID, UC.startDate, UC.endDate, " +
        "C.conditionName, C.conditionLink " +
        "FROM UserCondition AS UC INNER JOIN `Condition` AS C ON UC.conditionID = C.conditionID " +
        "WHERE UC.userID = ? " +
        "AND UC.endDate < NOW();", [userID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.getTaskList = function(userID, callback) {
    database.query(
        "SELECT taskID, taskName, taskSummary, recievedDate, dueDate FROM Task " +
        "WHERE userID = ? " +
        "AND dueDate > NOW() " +
        "ORDER BY dueDate;", [userID],
        function(err, rows) {
            callback(err, rows);
        });
};

database.insertAnswer = function(taskID, answer, callback){
    database.query(
        "INSERT INTO TaskQuestionnaire (taskID, answer, answered, dateSubmitted) "
        +"VALUES (?, ?, 1, CURRENT_TIMESTAMP);", [taskID, answer],
        function(err){
            callback(err);
        }
    )
}

module.exports = database;
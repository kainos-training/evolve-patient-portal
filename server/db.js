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

database.removeComment = function(medicationUserCommentID, callback) {
    database.query(
        "UPDATE MedicationUserComment SET deleted = true WHERE medicationUserCommentID = ?;", [medicationUserCommentID],
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

database.updatePrescribedDate = function(medicationUserID, callback) {
    database.query(
        "UPDATE medicationUser " +
        "SET prescribedDate  = curdate() " +
        "WHERE medicationUserID = ?;", [medicationUserID],
        function(err) {
            callback(err);
        });
};

database.getRepeatedMedication = function(userID, callback) {
    database.query(
        "SELECT U.userID, " +
        "M.medicationID, M.medicationName, " +
        "MT.medicationType, " +
        "MU.startDate, MU.endDate, MU.dosage, MU.medicationUserID " +
        "FROM User AS U INNER JOIN MedicationUser AS MU ON U.userID = MU.userID " +
        "INNER JOIN Medication AS M ON MU.medicationID = M.medicationID " +
        "INNER JOIN MedicationType AS MT ON MT.medicationTypeID = M.medicationTypeID " +
        "WHERE U.userID = ? " +
        "AND MU.endDate >= NOW() " +
        "AND MU.repeated = TRUE;", [userID],
        function(err, rows) {
            callback(err, rows);
        });
};

module.exports = database;

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

database.updatePrescribedDate = function(medicationUserID, deliveryStatus, callback) {
    console.log("The ID is : " + medicationUserID);
    database.query(
        'UPDATE MedicationUser ' +
        'SET prescribedDate = curdate(), repeated = 0, delivery = ? ' +
        'WHERE medicationUserID in ' + medicationUserID + ' ;', [deliveryStatus],
        function(err) {
            console.log(err);
            callback(err);
        });
};

database.getRepeatedMedication = function(userID, callback) {
    console.log("THIS IS NOT GOOD")
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

database.getLocalPharmacy = function(userID, callback) {
    console.log("Into the query")
    database.query(
        "SELECT pharmacyName, Pharmacy.address " +
        "FROM Pharmacy,`User` " +
        "WHERE `User`.userID = ? " +
        "AND `User`.pharmacyID = Pharmacy.pharmacyID;", [userID],
        function(err, rows) {
            callback(err, rows);
            console.log(err)
        });
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
        "SELECT T.taskID, T.taskName, T.taskSummary, T.recievedDate, T.dueDate FROM Task as T " +
        "LEFT JOIN TaskQuestionnaire as TQ " +
        "ON T.taskID = TQ.taskID " +
        "WHERE TQ.questionnaireID IS NULL " +
        "AND T.dueDate > NOW() " +
        "AND T.userID = ? " +
        "ORDER BY T.dueDate;", [userID],
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

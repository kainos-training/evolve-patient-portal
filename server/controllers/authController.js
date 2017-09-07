const db = require('../db');
const bodyParser = require('body-parser');
const emailer = require('../emailer');
var utilsJWT = require('../utils/jwt');

// for encrypting the passord;
var bcrypt = require('bcrypt');
//the salt to be used to hash the password
const saltRounds = 10;


function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string') {
        isFormValid = false;
        errors.username = 'Please provide a valid username.';
    }

    if (!payload || typeof payload.password !== 'string') {
        isFormValid = false;
        errors.password = 'Password must be valid';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

exports.login = function(req, res) {
    // Run request body through server side validation
    const validationResult = validateLoginForm(req.body);

    // Check if request body passed server side validation
    if (!validationResult.success) {
        return res.status(400).json({
            success: validationResult.success,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    let username = req.body.username.trim();
    let candidatePassword = req.body.password.trim();


    db.query(
        "SELECT userID, password, firstName, lastName FROM User WHERE username=?", [username],
        function(err, rows) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password"
                });
            } else if (!rows[0]) {
                return res.status(400).json({
                    success: false,
                    message: "No account associated with that username"
                });
            } else {
                let user = {
                    userId: rows[0].userID,
                    password: rows[0].password,
                    firstName: rows[0].firstName,
                    lastName: rows[0].lastName
                }

                bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: "Incorrect email or password"
                        });
                    } else if (!isMatch) {
                        return res.status(400).json({
                            success: false,
                            message: 'Incorrect email or password!',
                        });
                    } else {
                        let token = utilsJWT.generateToken(user); // Generate JWT Token
                        return res.status(200).json({
                            success: true,
                            message: 'You have successfully logged in!',
                            token: token,
                            userID: user.userId
                        });
                    }
                });
            }
        }
    )
};





function validateSignup(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload) {
        isFormValid = false;
        errors.username = 'Please provide a valid email address.';
    }

    if (!payload) {
        isFormValid = false;
        errors.password = 'Please provide valid password.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };
}

// Creates an account for a user;
exports.createUserAccount = function(req, res) {

    const validationResult = validateSignup(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


    let username = req.body.username.trim();
    let plainTextPassword = req.body.password.trim();

    //Creates the salt to be used
    var salt = bcrypt.genSaltSync(saltRounds);
    //Creates the hash of the plainTextPassword
    var hash = bcrypt.hashSync(plainTextPassword, salt);
    let password = hash;

    let dateOfBirth = req.body.dateOfBirth.trim();
    let gender = req.body.gender.trim();
    let MRIN = req.body.MRIN.trim();
    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let phoneNumber = req.body.phoneNumber.trim();
    let title = req.body.title.trim();
    let address = req.body.address.trim();
    let email = req.body.email.trim();
    let deceased = req.body.deceased.trim();
    let gpID = req.body.gpID.trim()

    db.query(
        "INSERT INTO User(username, `password`, dateOfBirth, gender, MRIN, firstName, lastName, phoneNumber, title, address, email, deceased, gpID)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [username, password, dateOfBirth, gender, MRIN, firstName, lastName, phoneNumber, title, address, email, deceased, gpID],
        function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log(err, rows);
            }

        });
};

exports.requestPasswordReset = function (req, res){

    console.log('Entered');
    const username = req.body.username;
    console.log('Id is ' + username);
    db.query(
        "SELECT email, CONCAT(firstName, ' ', lastName) AS name, userID FROM User WHERE username = ?",
        [username],
        function(err, rows) {
            if(err) throw err;
            if(rows.length==1){
                console.log("Rows is: "+ rows[0].name);
                emailer.sendNotification(rows[0].email,rows[0].name);
                console.log("Sent Email");
                return res.status(200).json({
                    success: true,
                    userID: rows[0].userID,
                    message: 'Reset Password Email has been sent'
                });
            }else{
                console.log("{exists:false}");
                return res.status(400).json({
                    success: false,
                    message: "No account associated with that username"
                });
            }
        }
    );
};

exports.getUser = function (req, res){
    
        console.log('Entered get user');
        const userID = req.body.userID;
        console.log('Id is ' + userID);
        db.query(
            "SELECT userID, username FROM User WHERE userID=?", [userID],
            function(err, rows) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: "Incorrect email or password"
                    });
                } else if (!rows[0]) {
                    return res.status(400).json({
                        success: false,
                        message: "No account associated with that username"
                    });
                } else {
                    let user = {
                        userID: rows[0].userID,
                        username: rows[0].username,
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'You have successfully logged in!',
                        userID: user.userID,
                        username: user.username
                    });
                }
            }
        );
    };

const db = require('../db');
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
        errors.username = 'Invalid username or password.';
    }

    if (!payload || typeof payload.password !== 'string') {
        isFormValid = false;
        errors.password = 'Invalid usesrname or password';
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
        "SELECT userID, password, firstName, lastName FROM User WHERE username=? AND active=true", [username],
        function(err, rows) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password"
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
                            message: "Incorrect username or password"
                        });
                    } else if (!isMatch) {
                        return res.status(400).json({
                            success: false,
                            message: 'Incorrect username or password!',
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

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length < 1) {
        isFormValid = false;
        errors.username = 'Please provide a valid username.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 1) {
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
    let mobilePhoneNumber = req.body.mobilePhoneNumber.trim();
    let homePhoneNumber = req.body.homePhoneNumber.trim();
    let workPhoneNumber = req.body.workPhoneNumber.trim();
    let title = req.body.title.trim();
    let address = req.body.address.trim();
    let email = req.body.email.trim();
    let deceased = req.body.deceased.trim();
    let gpID = req.body.gpID.trim()

    db.query(
        "INSERT INTO User(username, `password`, dateOfBirth, gender, MRIN, firstName, lastName, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, title, address, email, deceased, gpID)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [username, password, dateOfBirth, gender, MRIN, firstName, lastName, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, title, address, email, deceased, gpID],
        function(err, rows) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid info"
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "You have successfully registered"
                });
            }

        });
};
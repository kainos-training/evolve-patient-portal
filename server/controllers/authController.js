const db = require('../db');
const bodyParser = require('body-parser');

var utilsJWT = require('../utils/jwt');

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
    console.log(req.body);
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
            } else {
                let user = {
                    userId: rows[0].userID,
                    password: rows[0].password,
                    firstName: rows[0].firstName,
                    lastName: rows[0].lastName
                }
                console.log(user);

                if (candidatePassword == user.password) {
                    let token = utilsJWT.generateToken(user); // Generate JWT Token
                    return res.status(200).json({
                        success: true,
                        message: 'You have successfully logged in!',
                        token: token,
                        userID: user.userId
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Incorrect email or password"
                    });
                }
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

exports.createUserAccount = function(req, res) {

    const validationResult = validateSignup(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    console.log(req.body);
    console.log(req.body.username.trim());
    let username = req.body.username.trim();
    let password = req.body.password.trim();
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

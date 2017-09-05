const db = require('../db');

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string') {
        isFormValid = false;
<<<<<<< HEAD
        errors.username = 'Please provide a valid username.';
=======
        errors.username = 'Please provide a valid email address.';
>>>>>>> 19f210726d7470bee2fa2512ef3b29df654583e2
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
        "SELECT password FROM User WHERE username=?", [username],
        function(err, rows) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password"
                });
            } else {
                let dbPassword = rows[0].password;
                if (candidatePassword == dbPassword) {
                    return res.status(200).json({
                        message: 'You have successfully logged in!',
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


function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string') {
        isFormValid = false;
        errors.email = 'Please provide a valid email address.';
    }

    if (!payload || typeof payload.password !== 'string') {
        isFormValid = false;
        errors.password = 'Please provide valid password.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };
}

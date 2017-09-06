var jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = {
    //Generate Token using secret from process.env.JWT_SECRET
    generateToken: function(user) {
        var payload = {
            firstName: user.firstName,
            lastName: user.lastName
        };

        let token;
        return token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
    },

    verifyToken: function(req, res, next) {
        // middleware that checks if JWT token exists and verifies it if it does exist.
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.jwtSecret, function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
}

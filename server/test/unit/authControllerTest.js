let utilsJWT = require('../../utils/jwt');
let chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

const rewire = require('rewire');

describe('Validate Login Form Function', function() {
    var app = rewire('../../controllers/authController');
    validateLoginForm = app.__get__('validateLoginForm');

    it('should return true if valid username and password passed', function(done) {
        let reqBody = {
            username: "jsmith",
            password: "password"
        }

        let isFormValid = validateLoginForm(reqBody).success;
        assert.isTrue(isFormValid, done());
    });
    it('should return false if invalid username passed', function(done) {
        let reqBody = {
            username: 123,
            password: "password"
        };

        let isFormValid = validateLoginForm(reqBody).success;
        assert.isFalse(isFormValid, done());
    });
    it('should return false if invalid password passed', function(done) {
        let reqBody = {
            username: "jsmith",
            password: 123
        }

        let isFormValid = validateLoginForm(reqBody).success;
        assert.isFalse(isFormValid, done());
    });
    it('should return false if invalid username and password passed', function(done) {
        let reqBody = {
            username: 123,
            password: 123
        }

        let isFormValid = validateLoginForm(reqBody).success;
        assert.isFalse(isFormValid, done());
    });
});

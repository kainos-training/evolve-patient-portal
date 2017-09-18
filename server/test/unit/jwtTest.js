let utilsJWT = require('../../utils/jwt');
let chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('JWT generate token function', function() {
    it('should return token when valid user data passed', function(done) {
        let user = {
            firstName: "testFirstname",
            lastName: "testLastname"
        };

        let token = utilsJWT.generateToken(user);
        assert.typeOf(token, 'string', done());
    });
});

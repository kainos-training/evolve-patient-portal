const request = require('supertest');
const chai = require('chai');
var resetPass = require('../../controllers/resetPasswordController');


describe('Reset Password', function() {
    describe('POST /password/reset', function() {
        var app;
        beforeEach(function() {
            app = require('../../index');
        });
        afterEach(function() {
            app.close();
        
        });
        it('returns status code 200 with valid data', function() {
            request(app)
                .post('/password/reset')
                .send('userID= 6')
                .send('password=password123')
                .expect(200)
                .expect(function(res) {
                    res.body.message.should.equal('You have successfully changed your password!');
                    res.body.success.should.equal(true);
                })
                .end(done);
        });
    });
});
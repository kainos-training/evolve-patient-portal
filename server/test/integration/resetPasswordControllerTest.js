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
            const body = {
                "userID": "6",
                "password": "password123"
            };

            request(app)
                .post('/password/reset', body)
                .expect(200);
        });
    });
});
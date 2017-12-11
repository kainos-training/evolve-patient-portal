var request = require('supertest');
let chai = require('chai');

describe('User Details', function() {
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });
    it('Should update the user with new details', function(done) {
        const body = {
            email: "test@test.com",
            address: "21 No Where Lane",
            "mobilePhoneNumber": "123213",
            "homePhoneNumber": "456456",
            "workPhoneNumber": "789789",
            "userID": 1
        };

        request(app)
            .post('/user/updateUserDetails')
            .send(body)
            .expect(200, done);
    });
});

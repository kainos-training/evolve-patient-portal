const request = require('supertest');
const chai = require('chai');

let should = chai.should();
let assert = chai.assert;

describe('Request Reset Password Function', function() {
    describe('POST /password/user', function() {
        var app;
        beforeEach(function() {
            app = require('../../index');
        });
        afterEach(function() {
            app.close();
        });

        it('returns status code 200 with valid username', function(done) {
            request(app)
                .post('/password/user')
                .send('username=jdaniels')
                .expect(200)
                .expect(function(res) {
                    res.body.message.should.equal("Reset Password Email has been sent");
                    res.body.success.should.equal(true);
                })
                .end(done);
        });

        it('returns status code 400 with invalid username', function(done) {
            request(app)
                .post('/password/user')
                .send('username=randomname')
                .expect(400)
                .expect(function(res) {
                    res.body.message.should.equal("No account associated with that username");
                    res.body.success.should.equal(false);
                })
                .end(done);
        });

    });
});
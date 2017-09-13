var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Condition Endpoints', function() {
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });
    describe('Test /condition/current', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/condition/current')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"userID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/condition/current')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });

    describe('Test /condition/previous', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/condition/previous')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"userID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/condition/previous')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });
});
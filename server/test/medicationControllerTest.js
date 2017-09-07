var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Medication Endpoints', function() {
    var app;
    beforeEach(function() {
        app = require('../index');
    });
    afterEach(function() {
        app.close();
    });
    describe('Test /medication/list', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/medication/list')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"userID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/list')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });

    describe('Test /medication/comments/add', function() {
        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/comments/add')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });

            request(app)
                .post('/medication/comments/add')
                .expect(400)
                .send('{"commentText": "Test"}')
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });

            request(app)
                .post('/medication/comments/add')
                .expect(400)
                .send('{"medicationUserID":1}')
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });

    describe('Test /medication/comments/list', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/medication/comments/list')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"medicationUserID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/comments/list')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });

    describe('Test /medication/wiki/desc', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/medication/wiki/desc')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"medicationName":"Lithium"}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/wiki/desc')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });

    describe('Test /medication/history', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/medication/history')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"medicationID":1, "userID": 1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/history')
                .send('{"userID": 1}')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });
            request(app)
                .post('/medication/history')
                .send('{"medicationID":1}')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });
            request(app)
                .post('/medication/history')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });
});

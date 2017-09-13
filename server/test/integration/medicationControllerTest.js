var request = require('supertest');
var chai = require('chai');
var async = require('async');

var should = chai.should();
var assert = chai.assert;

describe('Medication Endpoints', function() {
    var app;

    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });
    describe('Test /medication/list', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            async.waterfall(
                [
                    login,
                    async.apply(testMedicationListRoute),
                ],
                function finish(err, result) {
                    done(err);
                }
            );

            function login(callback) {
                var user = {
                    username: 'jsmith',
                    password: 'password123'
                };
            
                request(app)
                    .post('/auth/login')
                    .send(user)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return callback(err);
                        callback(null, res.body.token);
                    });
                callback(null, 'one')
            }

            function testMedicationListRoute(token, callback) {
                request(app)
                    .post('/medication/list')
                    .set('x-access-token', token)
                    .type('json')
                    .send('{"userID":1}')
                    .expect(200, done);
                callback(null, 'done');
            }
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            async.waterfall(
                [
                    function login(callback) {
                        var user = {
                            username: 'jsmith',
                            password: 'password123'
                        };

                        request(app)
                            .post('/auth/login')
                            .send(user)
                            .expect(200)
                            .end(function(err, res) {
                                if (err) return callback(err);
                                callback(null, res.body.token);
                            });
                    },
                    function testMedicationListRoute(token, callback) {
                        request(app)
                            .post('/medication/list')
                            .expect(403)
                            .expect(function(res) {
                                res.body.success.should.equal(false);
                            })
                            .end(done);
                    }
                ],
                function finish(err, result) {
                    done(err);
                }
            );
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
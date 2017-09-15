var request = require('supertest');
var chai = require('chai');

var should = chai.should();
var assert = chai.assert;

describe('Medication Endpoints', function() {
    let app;
    let token;
    
    // Before all tests in this file run the application, login, then store the token
    before(function(done) {
        app = require('../../index');
        
        request(app)
            .post('/auth/login')
            .send('username=jsmith')
            .send('password=password123')
            .expect(200)
            .end(function(err, res) {
                token = res.body.token;
                app.close();
                done();
            });
        
    });
    // Before each tests in this file re-run the application
    beforeEach(function() {
        app = require('../../index');
    });
    // After each tests in this file close the application
    afterEach(function() {
        app.close();
    });
    describe('Test /medication/list', function() {
        it('returns valid data and status code 200 when posting valid data', function(done) {
            request(app)
                .post('/medication/list')
                .type('json')
                .set('x-access-token', token)
                .send('{"userID":1}')
                .expect(200, done);
        });
        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/list')
                .set('x-access-token', token)
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
                .set('x-access-token', token)
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });

            request(app)
                .post('/medication/comments/add')
                .set('x-access-token', token)
                .expect(400)
                .send('{"commentText": "Test"}')
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });

            request(app)
                .post('/medication/comments/add')
                .set('x-access-token', token)
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
                .set('x-access-token', token)
                .set('Accept', 'application/json')
                .send('{"medicationUserID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/comments/list')
                .set('x-access-token', token)
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
                .set('x-access-token', token)
                .set('Accept', 'application/json')
                .send('{"medicationName":"Lithium"}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/wiki/desc')
                .set('x-access-token', token)
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
                .set('x-access-token', token)
                .set('Accept', 'application/json')
                .send('{"medicationID":1, "userID": 1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/medication/history')
                .set('x-access-token', token)
                .send('{"userID": 1}')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });
            request(app)
                .post('/medication/history')
                .set('x-access-token', token)
                .send('{"medicationID":1}')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                });
            request(app)
                .post('/medication/history')
                .set('x-access-token', token)
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });
});
var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Condition Endpoints', function() {
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
                .set('x-access-token', token)
                .set('Accept', 'application/json')
                .send('{"userID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/condition/current')
                .set('x-access-token', token)
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
                .set('x-access-token', token)
                .set('Accept', 'application/json')
                .send('{"userID":1}')
                .expect(200, done);
        });

        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/condition/previous')
                .set('x-access-token', token)
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });
});
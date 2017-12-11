var request = require('supertest');
let chai = require('chai');
let should = chai.should();
var assert = chai.assert;

describe('Task listing endpoints', function(){
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });

    describe('Test /task/list', function(){
        it('returns valid data and status when posting valid data', function(done){
            request(app)
                .post('/task/list')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"userID":1}')
                .expect(200, done);
        });
        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/task/list')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });
    
});

describe('Adding an answer to questionnaire', function(){
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });

    describe('Test /task/answer', function(){
        it('returns valid data and status when posting valid data', function(done){
            request(app)
                .post('/task/answer')
                .type('json')
                .set('Accept', 'application/json')
                .send('{"taskID":1, "answer":["answer1", "answer2:"]}')
                .expect(200, done);
        });
        it('returns success false and status code 400 when posting invalid data', function(done) {
            request(app)
                .post('/task/answer')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
    });
    
});
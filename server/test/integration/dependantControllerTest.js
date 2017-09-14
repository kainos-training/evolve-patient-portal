var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Dependant Information', function() {
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });
    it('Returns status code 200 with no user ID passed', function(done) {
        request(app)
            .post('/dependants/getAllDependants')
            .expect(200, done);
    });
    it('Returns status code 200 with valid dependant data using user ID 1', function(done) {
        request(app)
            .post('/dependants/getAllDependants')
            .send('userID=1')
            .expect(200, done);
    });
    it('Returns status code 404 with invalid route', function(done) {
        request(app)
            .post('/dependants/getAllDependant')
            .send('userID=3')
            .expect(404, done);
    });
});
var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Patient Appointment View', function() {
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });
    it('Returns status code 200 with no user ID passed', function(done) {
        request(app)
            .post('/appointment/getAllAppointmentsByUserID')
            .expect(200, done);
    });
    it('Returns status code 200 with valid data using user ID 1', function(done) {
        request(app)
            .post('/appointment/getAllAppointmentsByUserID')
            .send('userID=1')
            .expect(200, done);
    });
    it('Returns status code 200 with valid data using user ID 3', function(done) {
        request(app)
            .post('/appointment/getAllAppointmentsByUserID')
            .send('userID=3')
            .expect(200, done);
    });
    it('Returns status code 404 with invalid route', function(done) {
        request(app)
            .post('/appointment/getAllAppointmentsByUserI')
            .send('userID=1')
            .expect(404, done);
    });
});

describe('Patient Portal Appointment Modal', function() {
    var app;
    beforeEach(function() {
        app = require('../../index');
    });
    afterEach(function() {
        app.close();
    });
    it('restablish connection return status code 200 with no appointmentID', function(done) {
        request(app)
            .post('/appointment/getAppointmentFurtherInfo')
            .send('appointmentID')
            .expect(200, done);
    });

    it('returns status code 200 with valid query data', function(done) {
        request(app)
            .post('/appointment/getAppointmentFurtherInfo')
            .send('appointmentID=1')
            .expect(200, done);
    });

    it('returns status code 404 with page not found', function(done) {
        request(app)
            .post('/appointment/getAppointmentFurtherWroungRoute')
            .send('appointmentID=1')
            .expect(404, done);
    });
});

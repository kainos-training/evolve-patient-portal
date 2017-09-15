const request = require('supertest');
const chai = require('chai');

let should = chai.should();
let assert = chai.assert;

describe('Repeat Prescription', function() {
    describe('POST /prescription/updatePrescribedDate', function() {
        var app;
        beforeEach(function() {
            app = require('../../index');
        });
        afterEach(function() {
            app.close();
        });
        it('/updatePrescribedDate Returns status code 400 with invalid medicationUserIDs ID passed', function(done) {
            request(app)
                .post('/prescription/updatePrescribedDate')
                .send('medicationUserIDs=0')
                .expect(400)
                .expect(function(res) {
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
        it('/updatePrescribedDate Returns status code 400 with null passed', function(done) {
            request(app)
                // .send(null)
                .post('/prescription/updatePrescribedDate')
                .send(null)
                .expect(400, done);
        });
        it('/updatePrescribedDate Returns status code 400 with invalid User ID passed', function(done) {
            request(app)
                //.send('userID=0')
                .post('/prescription/updatePrescribedDate')
                .send('userID=0')
                .expect(400, done);
        });
    });

    describe('/repeatedMedication Repeat Prescriptions', function() {
        var app;
        beforeEach(function() {
            app = require('../../index');
        });
        afterEach(function() {
            app.close();
        });
        it('/repeatedMedication Returns status code 400 with null passed', function(done) {
            request(app)
                .post('/prescription/repeatedMedication')
                .send(null)
                .expect(400, done);
        });
        it('/repeatedMedication Returns status code 200 with valid User ID passed', function(done) {
            request(app)
                .post('/prescription/repeatedMedication')
                .send('userID=1')
                .expect(200, done);
        });

        describe('/pharmacy Repeat Prescriptions', function() {
            var app;
            beforeEach(function() {
                app = require('../../index');
            });
            afterEach(function() {
                app.close();
            });
            it('/pharmacy Returns status code 400 with null passed', function(done) {
                request(app)
                    .post('/prescription/pharmacy')
                    .send(null)
                    .expect(400, done);
            });
        });
    });
});

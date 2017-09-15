var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Timeline Widget', function() {
    var app;
    beforeEach(function(){
        app = require('../../index');
    });
    afterEach(function(){
        app.close();
    });
    describe('getting timeline appointments data', function(){
        it ('Returns status code 200 with no user ID passed', function(done){
            request(app)
                .post('/timeline/getTimelineAppointments')
                .expect(200, done);
        });
        it ('Returns status code 200 with valid data using user ID 1', function(done){
            request(app)
                .post('/timeline/getTimelineAppointments')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 200 with valid data using user ID 3', function(done){
            request(app)
                .post('/timeline/getTimelineAppointments')
                .send('userID=3')
                .expect(200, done); 
        });
        it ('Returns status code 404 with invalid route', function(done){
            request(app)
                .post('/timeline/getTimelineAppointmentz')
                .send('userID=1')
                .expect(404, done); 
        });
    });

    describe('getting count appointment years in future',function(){
        it ('Returns status code 200 with no userID or appCount passed', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsFuture')
                .expect(200, done);
        });
        it ('Returns status code 200 with no userID passed', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsFuture')
                .send('appCount=1')
                .expect(200, done);
        });
        it ('Returns status code 200 with valid data using appCount 1 and UserID 1', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsFuture')
                .send('appCount=1')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 200 with valid data using appCount 2 and userID 1', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsFuture')
                .send('interval=3')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 200 with valid data (empty) using appCount 1000 and userID 1', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsFuture')
                .send('appCount=1000')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 404 with invalid route and valid data', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsFuturez')
                .send('appCount=1')
                .send('userID=1')
                .expect(404, done); 
        });
    });

    describe('getting count appointment years in previous',function(){
        it ('Returns status code 200 with no appCount or userID passed', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsPrevious')
                .expect(200, done);
        });
        it ('Returns status code 200 with no userID passed', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsPrevious')
                .send('appCount=1')
                .expect(200, done);
        });
        it ('Returns status code 200 with valid data using appCount 1 and userID 1', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsPrevious')
                .send('appCount=1')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 200 with valid data using appCount 2 and userID 1', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsPrevious')
                .send('appCount=2')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 200 with valid data (empty) using appCount 1000 and userID 1', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsPrevious')
                .send('appCount=1000')
                .send('userID=1')
                .expect(200, done); 
        });
        it ('Returns status code 404 with invalid route', function(done){
            request(app)
                .post('/timeline/countTimelineAppointmentsPreviouz')
                .send('appCount=1')
                .expect(404, done); 
        });
    });
    
});
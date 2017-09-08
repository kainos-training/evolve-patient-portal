var request = require('supertest');
let chai = require('chai');

let should = chai.should();
var assert = chai.assert;

describe('Left Side Bar User Info', function() {
    var app;
    beforeEach(function(){
        app = require('../index');
    });
    afterEach(function(){
        app.close();
    });
    it ('Returns status code 200 with no user ID passed', function(done){
        request(app)
            .post('/userInfo/getUserInfoByUserID')
            .expect(200, done);
    });
    it ('Returns status code 200 with valid data using user ID 1', function(done){
        request(app)
            .post('/userInfo/getUserInfoByUserID')
            .send('userID=1')
            .expect(200, done); 
    });
    it ('Returns status code 200 with valid data using user ID 3', function(done){
        request(app)
            .post('/userInfo/getUserInfoByUserID')
            .send('userID=3')
            .expect(200, done); 
    });
    it ('Returns status code 404 with invalid route', function(done){
        request(app)
            .post('/userInfo/getUserInfoByUser')
            .send('userID=1')
            .expect(404, done); 
    });
});
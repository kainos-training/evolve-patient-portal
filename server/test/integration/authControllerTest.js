const request = require('supertest');
const chai = require('chai');

let should = chai.should();
let assert = chai.assert;

describe('Patient Portal Webservice', function() {
    describe('POST /auth/login', function() {
        var app;
        beforeEach(function() {
            app = require('../../index');
        });
        afterEach(function() {
            app.close();
        });
        it('returns status code 200 with valid data', function(done) {
            request(app)
                .post('/auth/login')
                .send('username=jsmith')
                .send('password=password123')
                .expect(200)
                .expect(function(res) {
                    res.body.message.should.equal("You have successfully logged in!");
                    res.body.success.should.equal(true);
                    assert.isString(res.body.token);
                    assert.isNumber(res.body.userID);
                })
                .end(done);
        });

        it('returns status code 400 with invalid username', function(done) {
            request(app)
                .post('/auth/login')
                .send('username=randomname')
                .send('password=password123')
                .expect(400)
                .expect(function(res) {
                    res.body.message.should.equal("No account associated with that username");
                    res.body.success.should.equal(false);
                })
                .end(done);
        });

        it('returns status code 400 with invalid password', function(done) {
            request(app)
                .post('/auth/login')
                .send('username=jsmith')
                .send('password=asdf')
                .expect(400)
                .expect(function(res) {
                    res.body.message.should.equal("Incorrect username or password!");
                    res.body.success.should.equal(false);
                })
                .end(done);
        });
        it('return status code 400 with 101 characters for name', function(done) {
            request(app)
                .post('/auth/login')
                .send('username=eeeeeeeeeeffffffffffeeeeeeeeeeffffffffffeeeeeeeeeeffffffffffeeeeeeeeeeffffffffffeeeeeeeeeeffffffffffe')
                .send('password=password123')
                .expect(400, done);

        });

        it('return status code 400 with 0 charaacters for name', function(done) {
            request(app)
                .post('/auth/login')
                .send('username=')
                .send('password=password123')
                .expect(400, done);
        });

        it('return status code 404 with invalid URL', function(done) {
            request(app)
                .post('/auth/logi')
                .send('username=jsmith')
                .send('password=password123')
                .expect(404, done);
        });

        it('returns status code 400 with invalid username', function(done) {

            let data = {
                username: ''
            }
            request(app)
                .post('/auth/signup')
                .send(data.username)
                .send('password=password123')
                .send('dateOfBirth=1984-03-24')
                .send('gender=Male')
                .send('MRIN=432433654')
                .send('firstName=James')
                .send('lastName=Devlin')
                .send('mobilePhoneNumber=07702345367')
                .send('homePhoneNumber=02890842673')
                .send('workPhoneNumber=02890678536')
                .send('title=Mr')
                .send('address=26 Stranmillis Park, Belfast')
                .send('email=jdevlin@hotmail.co.uk')
                .send('deceased=No')
                .send('gpID=2')
                .expect(400, done);
        });

        it('returns status code 400 with invalid username', function(done) {

            let data = {
                password: ''
            }
            request(app)
                .post('/auth/signup')
                .send('username=jsmith')
                .send(data.password)
                .send('dateOfBirth=1984-03-24')
                .send('gender=Male')
                .send('MRIN=432433654')
                .send('firstName=James')
                .send('lastName=Devlin')
                .send('mobilePhoneNumber=07702345367')
                .send('homePhoneNumber=02890842673')
                .send('workPhoneNumber=02890678536')
                .send('title=Mr')
                .send('address=26 Stranmillis Park, Belfast')
                .send('email=jdevlin@hotmail.co.uk')
                .send('deceased=No')
                .send('gpID=2')
                .expect(400, done);
        });
    });
});

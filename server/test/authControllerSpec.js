var request = require('request');
const url = require('url');

var publicAuthRoute = require('../routes/publicAuthRoutes');
const config = require('../config');

var baseURL = "http://" + config.host + ":" + config.port;
var authUrl = url.parse(baseURL + "/auth/login");

describe("Patient Portal Webservice", function() {
    describe("POST /auth/login", function() {
        it("returns status code 200 with valid data", function(done) {
            let data = {
                username: "jsmith",
                password: "password123"
            };

            let requestOptions = {
                uri: authUrl,
                method: "POST",
                form: data
            }

            request(requestOptions, function(err, httpResponse, body) {
                expect(httpResponse.statusCode).toBe(200);
                done();
            });
        });
    });
});

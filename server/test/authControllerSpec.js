var request = require('request');

var publicAuthRoute = require('../routes/publicAuthRoutes');
const config = require('../config');

var baseURL = "http://" + config.host + ":" + config.port;
var authUrl = baseURL + "/auth/login";

describe("Patient Portal Webservice", function() {
    describe("POST /auth/login", function() {
        it("returns status code 200", function(done) {
            // let data = {
            //     username: "jsmith",
            //     password: "password123"
            // };
            //
            // request.post({
            //     url: authUrl,
            //     form: data,
            //     function(err, httpResponse, body) {
            //         console.log(err);
            //         expect(httpResponse.statusCode).toBe(200);
            //         done();
            //     }
            // });
        });
    });
});

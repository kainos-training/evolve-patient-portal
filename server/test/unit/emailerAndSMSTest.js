var request = require('supertest');
let chai = require('chai');
let SMSsender = require("../../smsSender.js");

let should = chai.should();
var assert = chai.assert;

describe('Emailer', function () {

    it('SMS returns 200', function (done) {
        SMSsender.sendSms("Hello World", "07854213244").then(function(res){
            assert.should.not.equal(res, null);
        });

    });

});
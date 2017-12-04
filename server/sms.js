var express = require('express');
var app = express();
var path = require('path');
var port = 9000;

process.env.TWILIO_ACCOUNT_SID = 'AC7d856a25a7fe0c1bd2cb1fc3d0660c4e';
process.env.TWILIO_AUTH_TOKEN = 'f43bd7bda6aa8ab797c9d51b8262d128';
process.env.TWILIO_PHONE_NUMBER = '+441484598115';

var client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

app.get('/send-message/:phoneno/:message', function (req, res) {
    client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.params.phoneno,
        body: req.params.message,
    }, function(err, message) {
        if(err) {
            console.error(err.message);
        }else{
            res.send('Message Sent');
        }
    });
});

app.listen(port, function(err) {
    console.log('Running on port ' + port);
});
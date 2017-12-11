var client = require('twilio')(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);

exports.sendSms = function(messageBody, sendTo){
    return new Promise(function(resolve, reject){
        client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: sendTo,
            body: messageBody,
        }, function(err, message) {
            if(err) {
                reject(err);
            }else{
                resolve(message);
            }
        });
    });
};
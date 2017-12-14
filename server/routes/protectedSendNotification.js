const express = require('express');
const notificationRouter = express.Router();
const smsSender = require('../smsSender');

notificationRouter.post('/sendNotification', function(req, res){
    smsSender.sendSms(req.body.messageBody, req.body.phone).then(function (result) {

    }).catch(function (err) {

    });
});

module.exports = notificationRouter;

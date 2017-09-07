// This file will handle sending notifications to the email address of
// the user who booked into the event
const nodemailer = require('nodemailer');
const emailConfig = require('./email.config.json');

exports.sendNotification = function(emailAddress, name) {

  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure, // true for 465, false for other ports,
      requireTLS: true,
      auth: {
        user: emailConfig.email, // generated ethereal user
        pass: emailConfig.password  // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Evolve Patient" <kainostdp2017@gmail.com>', // sender address
      to: emailAddress, // list of receivers
      subject: 'Password Reset for ' + name, // Subject line
      text: 'Click the link to reset your password http://localhost:4200/reset\nIf'+ 
      ' You Did NOT request this password reset please report this To Kainos Immediately', // plain text body
      html: '<b>Click the link to reset your password <a href="http://localhost:4200/reset">Reset Password</a><br/>'+
      'If You Did NOT request this password reset please report this To Kainos Immediately</b>' // html body
    };

    // send notification to users email address
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  });
}
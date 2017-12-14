// This file will handle sending notifications to the email address of
// the user who booked into the event
const nodemailer = require('nodemailer');
const notifier = require('./controllers/notificationController');

exports.sendNotification = function(emailAddress, name, id, type, querySubject, queryText, notificationType, htmlBody, time) {
    var isTrueSet = (process.env.SECURE == 'true');
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: isTrueSet, // true for 465, false for other ports,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD // generated ethereal password
            }
        });
        let mailOptions = {};
            if(type == "reset"){
            // setup email data with unicode symbols
            mailOptions = {
                from: '"Evolve Patient Portal" <kainostdp2017@gmail.com>', // sender address
                to: "m.corr@kainos.com", // list of receivers
                subject: 'Password Reset for ' + name, // Subject line
                text: 'Click the following link to reset your password: http://localhost:4200/reset\n\nIf' +
                    ' You Did NOT request this password reset please report this To Kainos Immediately', // plain text body
                html: 'Click the following link to reset your password: <a href="http://localhost:4200/reset/' + id + '">Reset Password</a><br/>' +
                    '<br/><b style="color:red"><u>If You Did NOT</u></b> request this password reset please report this To Kainos Immediately' // html body
            };
        }else if(type == "notify"){
            mailOptions = {
                from: '"Evolve Patient Portal" <kainostdp2017@gmail.com>', // sender address
                to: emailAddress, // list of receivers
                subject: "Notification: " + querySubject, // Subject line
                text: queryText, // plain text body
            };
        }else if(type == "preop"){
                mailOptions = {
                    from: '"Evolve Patient Portal" <kainostdp2017@gmail.com>', // sender address
                    to: 'johnd@kainos.com', // list of receivers
                    subject: "Reminder: Pre-Op Form", // Subject line
                    text: queryText, // plain text body
                };
            }
        // send notification to users email address
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    });
};

exports.sendEmail = function(email, taskName, mailBody){
    return new Promise((resolve, reject)=> {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: false, // true for 465, false for other ports,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD // generated ethereal password
            }
        });

        mailOptions = {
            from: '"Evolve Patient Portal" <kainostdp2017@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reminder: " + taskName, // Subject line
            html: mailBody, // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }else {
                resolve(info);
            }
        });
    });
};
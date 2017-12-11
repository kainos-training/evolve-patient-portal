//import { error } from 'util';
const nodemailer = require('nodemailer');

exports.sendEmail = function (recipient, notificationType, emailBody) {
    var isTrueSet = (process.env.secure == 'true');
    nodemailer.createTestAccount((err, recipient, notificationType, emailBody) => {

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: isTrueSet,
            requireTLS: true,
            auth: {
                user: "kainostdp2017@gmail.com",
                pass: 'k@in0stdp'
            }
        });

        let mailOptions = {
            from: '"Evolve Portal" <kainostdp2017@gmail.com>',
            to: 'm.corr@kainos.com', //recipient, (passed paramteres arnt working yet and no recipent causes othe rissues so hardcoding for now)
            subject: "Notification: " + notificationType,
            text: emailBody//,
            //html: (can define body using html instead of plain text)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                console.log('Message sent: %s', info.messageId);

            }
        })
    })

}


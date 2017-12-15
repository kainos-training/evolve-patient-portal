/**
 * Module dependencies.
 */
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var dotenv = require('dotenv');
const moment = require('moment');
var cron = require('node-cron');
const emailer = require('./emailer');
const notifier = require('./controllers/notificationController');
const SMS = require('./smsSender');

notifier.getTaskByDueDate().then((res)=>{
    for(let counter=0; counter<res.length; counter++){
        let currentRow = res[counter];
        let emailText = emailBuilder(res[counter]);
        let smsText = smsTextBuilder(res[counter]);
        emailer.sendEmail(currentRow.email, currentRow.taskName, emailText);
        SMS.sendSms(smsText, currentRow.mobilePhoneNumber);
    }
}).catch((err)=>{
    console.log(err);
});

cron.schedule('0 50 10 * * *', ()=>{
    
});

/**
 * Load environment variables from .env file.
 * if there is a variable in your .env file which collides with one that already 
 * exists in your environment, then that variable will be skipped
 */
dotenv.config();

/**
 * Connect to mySQL database server
 */
const db = require('./db');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.EXPRESSPORT || 8002);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(errorHandler()); // Error Handler middleware for more verbose errors

/**
 * Routes configuration.
 */
const publicAuthRoutes = require('./routes/publicAuthRoutes');
const protectedAppointmentRoutes = require('./routes/protectedAppointmentRoutes');
const protectedMedicationRoutes = require('./routes/protectedMedicationRoutes');
const publicUserRoutes = require('./routes/publicUserRoutes');
const publicUserInfoRoute = require('./routes/publicUserInfoRoute');
const publicResetPasswordRoutes = require('./routes/publicResetPasswordRoutes');
const protectedPrescriptionRoutes = require('./routes/protectedPrescriptionRoutes');
const protectedTimelineRoutes = require('./routes/protectedTimelineRoutes');
const publicDependantRoutes = require('./routes/publicDependantRoutes');
const protectedConditionRoutes = require('./routes/protectedConditionRoutes');
const publicTaskRoutes = require('./routes/publicTaskRoutes');
const protectedGPRoutes = require('./routes/protectedGPRoutes');
const notificationController = require('./controllers/notificationController');

app.use('/password', publicResetPasswordRoutes);
app.use('/auth', publicAuthRoutes);
app.use('/appointment', protectedAppointmentRoutes);
app.use('/medication', protectedMedicationRoutes);
app.use('/userInfo', publicUserInfoRoute);
app.use('/user', publicUserRoutes);
app.use('/prescription', protectedPrescriptionRoutes);
app.use('/timeline',protectedTimelineRoutes);
app.use('/dependants', publicDependantRoutes);
app.use('/condition', protectedConditionRoutes);
app.use('/task', publicTaskRoutes);
app.use('/gp', protectedGPRoutes);

var server = app.listen(app.get('port'));
module.exports = server;

function smsTextBuilder(info){
    let result = "Dear "+info.firstName+" "+info.lastName+", " +
        "This is a reminder for you to complete your "+info.taskName + " " +
        "This is due on "+moment(info.dueDate).format('DD/MM/YYYY HH:MM') + " http://localhost:4200/questionnaire?taskID=NA%3D%3D"
}

function emailBuilder(info){
    let result = "<p>Dear "+info.firstName+" "+info.lastName+",</p>" +
    "<p>This is a reminder for you to complete your "+info.taskName+".</p>" +
    "<p>This is due on "+moment(info.dueDate).format('DD/MM/YYYY HH:MM')+"</p>" + " http://localhost:4200/questionnaire?taskID=NA%3D%3D" +
    "<br>";
    return result;
}
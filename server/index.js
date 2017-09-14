/**
 * Module dependencies.
 */
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var dotenv = require('dotenv');

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
const publicAppointmentRoutes = require('./routes/publicAppointmentRoutes');
const protectedMedicationRoutes = require('./routes/protectedMedicationRoutes');
const publicUserRoutes = require('./routes/publicUserRoutes');
const publicUserInfoRoute = require('./routes/publicUserInfoRoute');
const publicResetPasswordRoutes = require('./routes/publicResetPasswordRoutes');
const protectedTimelineRoutes = require('./routes/protectedTimelineRoutes');
const publicDependantRoutes = require('./routes/publicDependantRoutes');
const protectedConditionRoutes = require('./routes/protectedConditionRoutes')
const publicTaskRoutes = require('./routes/publicTaskRoutes');

app.use('/password', publicResetPasswordRoutes);
app.use('/auth', publicAuthRoutes);
app.use('/appointment', publicAppointmentRoutes);
app.use('/medication', protectedMedicationRoutes);
app.use('/userInfo', publicUserInfoRoute);
app.use('/user', publicUserRoutes);
app.use('/timeline',protectedTimelineRoutes);
app.use('/dependants', publicDependantRoutes);
app.use('/condition', protectedConditionRoutes);
app.use('/task', publicTaskRoutes);

var server = app.listen(app.get('port'));
module.exports = server;
/**
 * Module dependencies.
 */
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

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
app.set('port', config.port || 8002);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
})); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev')); // HTTP request logger middleware.
app.use(errorHandler()); // Error Handler middleware for more verbose errors

/**
 * Express configuration.
 */
const publicAuthRoutes = require('./routes/publicAuthRoutes');
const publicAppointmentRoutes = require('./routes/publicAppointmentRoutes');
app.use('/auth', publicAuthRoutes);
app.use('/appointment', publicAppointmentRoutes);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port' + " " + app.get('port'));
});

/**
 * Module dependencies.
 */
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db.js');
const config = require('./config.json');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', config.port || 8002);
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); // HTTP request logger middleware.
app.use(errorHandler());// Error Handler middleware for more verbose errors

/**
 * Routes configuration.
 */
app.get('/testQuery', function(req, res) {
	db.testQuery( function(rows) {
		res.send(rows);
	});
})

app.listen(8002, function() {
    console.log('Express server listening on port 8002');
});

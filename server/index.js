const express = require ('express');
const app = express();
const db = require('./db.js');
const config = require('./config.json');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/testQuery', function(req, res) {
	db.testQuery( function(rows) {
		res.send(rows)
	});
})


app.listen(config.port, function () {
	console.log('Express API listening on port 8002...')
});
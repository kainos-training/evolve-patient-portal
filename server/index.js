const express = require ('express');
const app = express();
const db = require('./db.js');


app.listen(8002, function () {
	console.log('Express API listening on port 8002...')
});

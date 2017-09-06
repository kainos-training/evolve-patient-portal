const express = require ('express');
const app = express();
const db = require('./db.js');
const config = require('./config.json');
const bodyParser = require('body-parser');
//const emailer = require('./email.js');

app.use(bodyParser.json());

app.get('/testQuery', function(req, res) {
	db.testQuery( function(rows) {
		res.send(rows)
	});
})

app.post('/user', function(req, res) {
	console.log('Entered');
	const username = req.body.username;
	console.log('Id is ' + username);
	db.checkUserValid(username, function(rows) {
		if(rows.length==1){
			console.log(rows);
			res.send(rows);
			//username doesn't exist
		}else{
			res.send("{exists:false}");
			}
		
	});
})

app.listen(config.port, function () {
	console.log('Express API listening on port 8002...')
});
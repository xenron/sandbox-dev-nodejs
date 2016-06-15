var newrelic = require('newrelic');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.send('Hello World');
});

app.get('/goodbye', function(req, res) {
	res.send('Goodbye World');
});

app.listen(3000);
console.log('Server started on port 3000');

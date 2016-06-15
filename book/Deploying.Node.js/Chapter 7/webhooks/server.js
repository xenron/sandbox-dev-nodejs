var express 	= require('express');
var app     	= express();
var bodyParser 	= require('body-parser');
var port    	= process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Hello World!');  
});

app.post('/webhook', function(req, res) {
	console.log(req.body);
});

app.listen(port);

console.log('Express server listening on port ' + port);
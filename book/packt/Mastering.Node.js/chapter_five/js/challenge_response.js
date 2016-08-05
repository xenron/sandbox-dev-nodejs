var crypto 	= require('crypto');
var fs 		= require('fs');
var express = require('express');
var app 	= express();
var redis 	= require("redis");
var client	= redis.createClient();

app.get('/authenticate/:username', function(request, response){
	var publicKey = Math.random();
	var username = request.params.username; // This is always "jack"
	
	// ... get jack's data from redis
	client.hgetall(username, function(err, data) {
		if(err || !data) {
			return response.end("no data");
		}
		//	Jack's password is always "beanstalk"
		var challenge = crypto.createHash('sha256').update(publicKey + data.password).digest('hex');

		//	Store challenge for later match
		client.set(challenge, username);
		
		response.end(challenge);
	});
});

app.get('/login/:response', function(request, response){
	var hash = request.params.response;
  	client.exists(hash, function(err, exists) {
  		if(err || !exists) {
  			return response.end("failed");
  		}
  	});
  
  	client.del(hash, function() {
  		response.end("OK");
  	});
});

app.get('/', function(request, response) {
    fs.readFile('./challenge_response.html', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

app.get('/256', function(request, response) {
    fs.readFile('./sha256.js', function(err, data) {
        response.end(data);
    });
});

app.listen(8080);



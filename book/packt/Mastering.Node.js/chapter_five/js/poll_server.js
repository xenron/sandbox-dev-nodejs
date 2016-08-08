var fs = require('fs');
var express = require('express');
var app = express();

var connections = {};

app.use(express.cookieParser());

app.get('/poll', function(request, response){
	var id = request.cookies.node_poll_id;
	if(!id) {
		return;
	}
	connections[id] = response;
});

app.get('/', function(request, response) {
    fs.readFile('./poll_client.html', function(err, data) {
    	response.cookie('node_poll_id', parseInt(Math.random() * 10e10));
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

app.listen(2112);

var redis 		= require("redis");
var receiver	= redis.createClient();
var publisher 	= redis.createClient();

receiver.subscribe("stdin_message");
receiver.on("message", function(channel, message) {
	var conn;
	for(conn in connections) {
		connections[conn].end(message);
	}
    console.log("Received message: " + message + " on channel: " + channel);
});

process.stdin.on('readable', function() {
	var msg = this.read();
	msg && publisher.publish("stdin_message", msg.toString());
});



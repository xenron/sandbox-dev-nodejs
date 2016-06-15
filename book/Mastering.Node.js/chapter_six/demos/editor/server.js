require('coffee-script');
var express = require('express');
var sharejs = require('share');
var server = express();
server.use(express.static(__dirname + '/'));

var options = {
	db: {type: 'none'},
	browserChannel: {cors: '*'},
	auth: function(client, action) {
		console.log(arguments)
	  	action.accept();
	}
};

// Lets try and enable redis persistance if redis is installed...
//
try {
	require('redis');
	options.db = {type: 'redis'};
} catch(e) {}

console.log("Server Started");

//	Bind sharejs interfaces to our server
//
sharejs.server.attach(server, options);

server.listen(2112);

process.title = 'editor demo'


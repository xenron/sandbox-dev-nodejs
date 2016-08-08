var dgram = require("dgram");

//	Create a udp4 socket
//
var socket = dgram.createSocket("udp4");

//	Messages are handled here
//
socket.on("message", function(msg, info) {
	console.log(arguments);
	console.log("socket got: " + msg + " from " +
	info.address + ":" + info.port);
});

//	socket listening on localhost, port 41234.
//	Callback is fired once socket is listening.
//
socket.bind(41234);

socket.on("listening", function() {
	console.log("Listening for datagrams.");
});

var client = dgram.createSocket("udp4");

var message = new Buffer("UDP says Hello!");

client.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
	client.close();
});

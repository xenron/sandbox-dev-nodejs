var http = require('http');
var static = require('node-static'); 
var fileServer = new static.Server();

var app = http.createServer(function(request, response) {
	fileServer.serve(request, response);
});
var io = require('socket.io').listen(app, { log: false });

app.listen(2112);

io.sockets.on('connection', function(socket) {
	var id = socket.id;

	socket.on('mousemove', function(data) {
		data.id = id;
		socket.broadcast.emit('moving', data);
	});
	
	socket.on('disconnect', function() {
		socket.broadcast.emit('clientdisconnect', id);
	});
});
var http = require('http');
var server = new http.Server();

server.on("connection", function(socket) {
	console.log("Client arrived: " + new Date());
	socket.on("end", function() {
		console.log("Client left: " + new Date());
	});
})

server.on("request", function(request, response) {
	request.setEncoding("utf8");
	console.log("\n\n\n");
	console.log("******** CHUNK *********\n");
	console.log("\n\n\n");
	request.on("readable", function() {
		var d;
		while(d = request.read(1000)) {
			console.log(d);
		}
	});
});

server.setTimeout(2000, function(socket) {
	socket.write("Too Slow!", "utf8");
	socket.end();
});

server.listen(8080);


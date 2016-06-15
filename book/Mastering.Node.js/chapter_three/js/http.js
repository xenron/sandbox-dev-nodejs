var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {

	response.writeHead(200, { 
		'Content-Type': 'text/plain'
	});
	response.write("PONG");
	response.end();
}).listen(8080);

server.on("request", function(request, response) {

	request.setEncoding("utf8");
	request.on("readable", function() {
		console.log(request.read())
	});
	request.on("end", function() {
		console.log("DONE");
	});
});

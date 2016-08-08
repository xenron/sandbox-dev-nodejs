var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
	request.socket.setTimeout(1000);
	request.socket.on("timeout", function() {
		console.log("TIMED OUT")
	});
}).listen(8080, function() {

	var request = http.request({
    	port: 8080,
    	hostname: 'localhost',
    	path: '/my/path/'
  	});
  	request.on("error", function() {
  		console.log("ERRRR");
  	});
	request.end();
});

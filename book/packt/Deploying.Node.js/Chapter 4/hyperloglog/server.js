"use strict";

var http 	= require('http');
var redis	= require('redis');
var fs		= require('fs');

var client = redis.createClient();

var hyperLLKey = 'hyper:uniques';

function respond(response, code, msg) {
	response.writeHead(code, {
		"content-type" : "application/json"
	});
	response.end(msg);
}

http.createServer(function(request, response) {

	var route = request.url;
	
	if(route === "/") {
		response.writeHead(200, {
			"content-type" : "text/html"
		});
		return fs.createReadStream('./index.html').pipe(response);
	}
	
	var val = route.match(/^\/log\/(.*)/);

	if(val) {
		val = val[1];
		return client.pfadd(hyperLLKey, val, function() {
			client.pfcount(hyperLLKey, function(err, card) {
				respond(response, 200, JSON.stringify({
					count: err ? 0 : card
				}))
			})
		});
	} 
	
	respond(response, 400);

}).listen(8080)



	

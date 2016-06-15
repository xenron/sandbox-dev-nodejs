var fs = require('fs');
var http = require('http');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

http.createServer(function(request, response) { 

	S3.headObject({
		Key : request.url
	}, function(err, data) {

		if(err) {
			//	...
		}

		response.writeHead(302, {
		  'Location': 'https://s3.amazonaws.com/nodejs-book' + request.url
		});
		response.end();
	});
}).listen(2112);



var http = require('http');
var fs = require('fs');
var crypto = require('crypto')

http.createServer(function(request, response) {

	console.log(request.headers)

	var filename = __dirname + request.url;
    	
	fs.stat(filename, function(err, stat) {
	
    	if(err) {
    		response.statusCode = err.errno === 34 ? 404 : 500;
			return response.end()
    	} 

		var etag = 	crypto
					.createHash('md5')
					.update(stat.size + stat.mtime)
					.digest('hex');
					
		response.setHeader('Last-Modified', stat.mtime);

		if(request.headers['if-none-match'] === etag) {
			response.statusCode = 304;
			return response.end();
		}

		response.setHeader('Content-Length', stat.size);
		response.setHeader('ETag', etag);
		response.statusCode = 200;
		
		fs.createReadStream(filename).pipe(response);
	});

}).listen(8080);

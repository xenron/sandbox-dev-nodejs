var http 		= require('http');
var fs 			= require('fs');
var formidable 	= require('formidable');
var crypto 		= require('crypto');

http.createServer(function(request, response) {

	var rm = request.method.toLowerCase();
	
	if(rm === "post") {

		var form = new formidable.IncomingForm();
		form.uploadDir = process.cwd();

		form
		.on("file", function(field, file) {
			// ...
		})
		.on("field", function(field, value) {
			// ...
		})
		.on("end", function() {
			response.end("Received");
		})
		.parse(request);
		
		return;
	}
	
	// We can only handle GET requests at this point
	
	if(rm !== "get") {
		return response.end("Unsupported method");
	}
	
	var filename = __dirname + request.url;
    	
	fs.stat(filename, function(err, stat) {
	
    	if(err) {
    		response.statusCode = err.errno === 34 ? 404 : 500;
			return response.end()
    	} 

		var etag = crypto.createHash('md5').update(stat.size + stat.mtime).digest('hex');
					
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

}).listen(8000);

var http = require('http');

http.createServer(function(request, response) {
	var maxBytes 		= 1342063;
	var buffer 			= new Buffer(maxBytes);
	var totalBytesRead 	= 0;
	
	request.setEncoding("utf8");
	
	console.log(request.headers)
	
	request.on('readable', function() {
		
		var chunk 		= request.read();
		var readBytes	= Buffer.byteLength(chunk, 'utf8');

		buffer.write(chunk, totalBytesRead, readBytes);
		
		totalBytesRead 	= request.socket.bytesRead;
		
		if(totalBytesRead > maxBytes) {
		
		console.log(totalBytesRead);
		
			response.writeHead(413, {'Content-Type': 'text/plain'});
			response.end("File too large\n");
            return request.connection.destroy();
		}
	});

	request.on('end', function() {
		response.end("FIN");
		//console.log(buffer.slice(0,totalBytesRead).toString());
	});
}).listen(8080);

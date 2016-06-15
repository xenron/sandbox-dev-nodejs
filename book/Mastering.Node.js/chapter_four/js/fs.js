var fs = require('fs');

fs.open('path.js', 'r', function(err, fd) {
    fs.fstat(fd, function(err, stats) {
    
    	var totalBytes	= stats.size;
        var buffer		= new Buffer(totalBytes);
        var bytesRead 	= 0;

		//	Each call to #read should ensure that the chunk being read is
		//	within proper size ranges (not too small; not too large).
		var read = function(chunkSize) {
		    fs.read(fd, buffer, bytesRead, chunkSize, bytesRead, function(err, numBytes, bufRef) {
		    
		    	if((bytesRead += numBytes) < totalBytes) {
		    		return read(Math.min(512, totalBytes - bytesRead));
		    	}
		    	
		    	fs.close(fd);
		    	
		    	//	The file will exist in #buffer; report total bytes read.
		    	//
		    	console.log("File read complete. Total bytes read: " + totalBytes);
		    	console.log(buffer.toString());
		    });
		}
		
		read(Math.min(512, totalBytes));
    });
});

var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

var outFile = fs.createWriteStream('./fetchedfile.jpg');


/*
S3.getObject({
	Key	: 'demos/putObject/optimism.jpg'
}).createReadStream().pipe(outFile);
*/

S3.getObject({
	Key	: 'demos/putObject/testfile.jpg'
})
.on('httpData', function(chunk) { 
	outFile.write(chunk); 
})
.on('httpDone', function() { 
	outFile.end(); 
})
.send();

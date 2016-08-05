var AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs.examples'
	}
});

S3.createBucket({
	params: {
		Bucket: 'nodejs.examples'
	}
}, function(err, data) {
	if(err) {
		throw new Error("Unable to create bucket.");
	}
	
	console.log(data);
});



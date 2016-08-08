var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

/*
var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs'
	}
});

S3.createBucket(function(err, data) {
	...
});

*/

var S3 = new AWS.S3();

S3.createBucket({
	Bucket: 'nodejs-book'
}, function(err, data) {
	if(err) {
		throw new Error("Unable to create bucket.");
	}
	
	console.log(data);
});
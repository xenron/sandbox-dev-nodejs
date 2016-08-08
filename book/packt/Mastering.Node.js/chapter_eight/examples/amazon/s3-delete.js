var fs = require('fs');
var http = require('http');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

S3.deleteObject({
	Bucket 	: 'nodejs-book',
	Key 	: 'demos/putObject/optimism.jpg'
}, function(err, data) { 
	// 	...
});

S3.deleteObjects({
	Bucket	: 'nodejs-book',
	Delete	: {
		Objects	: [
			{
				Key	: 'demos/putObject/first.json'
			},
			{
				Key	: 'demos/putObject/testimage2.jpg'
			}
			//	...
		]
	}
}, function(err, data) { 
	//	...
});
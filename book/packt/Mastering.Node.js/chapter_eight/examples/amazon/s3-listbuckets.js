var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3();
S3.listBuckets(function(err, data) {
	console.log(data.Buckets);
});

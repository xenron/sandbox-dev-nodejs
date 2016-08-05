var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

var body = JSON.stringify({ foo: "bar" });
var s3Obj = {
	Key						: 'demos/putObject/first.json',
	Body					: body,
	ServerSideEncryption	: "AES256",
	ContentType				: "application/json",
	ContentLength			: body.length,
	ACL						: "private"
}

S3.putObject(s3Obj, function(err, data) {
	if(err) {
		throw new Error("PUT error");
	} 
	
	console.log(data);
});

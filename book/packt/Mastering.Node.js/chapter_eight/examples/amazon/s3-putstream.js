var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

var fs = require('fs');
fs.stat("./testimage.jpg", function(err, stat) {

	var s3Obj = {
		Key						: 'demos/putObject/testimage.jpg',
		Body					: fs.createReadStream("./testimage.jpg"),
		ContentLength			: stat.size,
		ContentType				: "image/jpeg",
		ACL						: "public-read"
	}
	
	S3.putObject(s3Obj, function(err, data) {
		if(err) {
			throw new Error("PUT error");
		} 
		
		console.log(data);
	});
})

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var ses = new AWS.SES();

ses.getSendQuota(function(err, data) {
	console.log(err, data);
});

ses.sendEmail({
	Source : "spasquali@gmail.com",
	Destination	: {
		ToAddresses : [
			"spasquali@gmail.com"
		]
	},
	Message	: {
		Subject	: {
			Data : "NodeJS and AWS SES"
		},
		Body : {
			Text : {
				Data : "It worked!"
			}
		}
	}
}, function(err, resp) {
	console.log(resp);
});
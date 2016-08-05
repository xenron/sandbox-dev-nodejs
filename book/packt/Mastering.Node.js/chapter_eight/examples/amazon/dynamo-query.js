var events = require('events');
var util = require('util');
var emmiter = new events.EventEmitter();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var db = new AWS.DynamoDB(); 

db.getItem({
	TableName : "purchases",
	Key : {
		Id : {
			"N"		: "124"
		},
		Date : {
			"N"		: "1375314738467"
		}
	},
	AttributesToGet : [
		"Action", 
		"Cart"
	]
}, function(err, res) {
	console.log(util.inspect(res, {
		depth: 10
	}));
});


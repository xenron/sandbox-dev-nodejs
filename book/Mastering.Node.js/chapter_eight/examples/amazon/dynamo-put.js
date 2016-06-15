var events = require('events');
var util = require('util');
var emmiter = new events.EventEmitter();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var db = new AWS.DynamoDB(); 

db.putItem({
	TableName : "purchases",
	Item : {
		Id : {
			"N"		: "125"
		},                                       
		Date : {
			"N" 	: "1375314738478"
		},
		UserId 	: {
			"S" : "DD9EDG8890"
		},
		Cart 	: {
			"SS" : [ "song14", "song63" ]
		},
		Action 	: {
			"S" : "buy"
		}
	}
}, function() {
	console.log(arguments);
});


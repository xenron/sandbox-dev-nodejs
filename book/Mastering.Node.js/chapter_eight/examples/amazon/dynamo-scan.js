var events = require('events');
var util = require('util');
var emmiter = new events.EventEmitter();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var db = new AWS.DynamoDB(); 

/*
db.scan({
	TableName : "purchases",
	ScanFilter : {
	  	"Cart": {
	  		"AttributeValueList" : [
	  			{
	  				"S":"song2"
	  			}
	  		],
	    	"ComparisonOperator" : "CONTAINS"
	    },
	}
}, function(err, res) {
	console.log(util.inspect(res, {
		depth: 10
	}));
});
*/

db.scan({
	TableName : "purchases",
	ScanFilter : {
		"Date": {
			"AttributeValueList" : [
				{
					"N" : "1375314738467"
				}
			],
			"ComparisonOperator" : "EQ"
		},
	  	"Cart": {
	  		"AttributeValueList" : [
	  			{
	  				"S" : "song2"
	  			}
	  		],
	    	"ComparisonOperator" : "CONTAINS"
	    },
	}
}, function(err, res) {
	console.log(util.inspect(res, {
		depth: 10
	}));
});


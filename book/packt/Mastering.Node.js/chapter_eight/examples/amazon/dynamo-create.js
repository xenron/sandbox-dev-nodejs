var events = require('events');
var util = require('util');
var emmiter = new events.EventEmitter();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

var db = new AWS.DynamoDB(); 

db.createTable({
	TableName: 'purchases',
	AttributeDefinitions : [{
		AttributeName : "Id",
		AttributeType : "N"
	}, {
		AttributeName : "Date",
		AttributeType : "N"
	}],
	KeySchema: [{ 
		AttributeName: 'Id', 
		KeyType: 'HASH' 
	}, { 
		AttributeName: 'Date', 
		KeyType: 'RANGE' 
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 2,
		WriteCapacityUnits: 2
	}
}, function(err, data) { 
	console.log(util.inspect(data, {
		depth: 10
	}));
});

db.listTables({}, function() {
	console.log(arguments)
});

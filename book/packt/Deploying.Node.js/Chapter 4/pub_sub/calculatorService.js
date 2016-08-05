var redis = require("redis");

var publisher = redis.createClient();
var subscriber = redis.createClient();

var child_process = require('child_process');

var add = child_process.fork('add.js');
var subtract = child_process.fork('subtract.js');

add.on('message', function() {
	publisher.publish('service:add', JSON.stringify([7,3]))
})

subtract.on('message', function() {
	publisher.publish('service:subtract', JSON.stringify([7,3]))
})

subscriber.subscribe('result:added')
subscriber.subscribe('result:subtracted')
subscriber.on('message', function(operation, result) {
	console.log(operation + ' = ', result);
})


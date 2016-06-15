var redis = require("redis");

var publisher = redis.createClient();
var subscriber = redis.createClient();

subscriber.subscribe('service:subtract');

subscriber.on('message', function(channel, operands) {
	var result = JSON.parse(operands).reduce(function(a, b) {
		return a - b;
	})
	
	publisher.publish('result:subtracted', result);
})

subscriber.on('subscribe', function() {
	process.send('ok')
})
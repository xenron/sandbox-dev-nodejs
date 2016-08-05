var redis = require("redis");

var publisher = redis.createClient();
var subscriber = redis.createClient();

subscriber.subscribe('channel5');

subscriber.on('message', function(channel, message) {
	console.log('channel: ', channel) 
	console.log('message: ', message)
})

subscriber.on('subscribe', function() {
	publisher.publish('channel5', 'This is a message')
})




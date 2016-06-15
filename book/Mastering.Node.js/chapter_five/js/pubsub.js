var redis 		= require("redis");
var receiver	= redis.createClient();
var publisher 	= redis.createClient();

receiver.subscribe("firehose");
receiver.on("message", function(channel, message) {
    console.log("Received message: " + message + " on channel: " + channel);
});

setTimeout(function() {
	publisher.publish("firehose", "Hello!");
}, 1000);

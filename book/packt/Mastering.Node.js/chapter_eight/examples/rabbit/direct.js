var amqp = require('amqp');

var consumer = amqp.createConnection({ host: 'localhost', port: 5672 });

consumer.on('ready', function() {
	var exchange = consumer.exchange('node-direct-exchange', {type: "direct"});
	consumer.queue('node-topic-queue', function(q) {

		q.bind(exchange, 'room1');
		q.subscribe(function(message) {
			console.log("room1 received: " + message.data.toString('utf8'));
		});
		
		q.bind(exchange, 'room2');
		q.subscribe(function(message) {
			console.log("room2 received: " + message.data.toString('utf8'));
		});
		
		exchange.publish("room1", "Hello Room1!");
		exchange.publish("room2", "Hello Room2!");
		
		//	Nobody should hear this
		//
		exchange.publish("room3", "Hello Room3!");
	});
});
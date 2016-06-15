var amqp = require('amqp');

var consumer = amqp.createConnection({ host: 'localhost', port: 5672 });
var exchange;

consumer.on('ready', function() {
	exchange = consumer.exchange('node-topic-exchange', {type: "topic"});
	consumer.queue('node-topic-queue', function(q) {

		q.bind(exchange, '#');

		q.subscribe(function(message) {
			//	Messages are buffers
			//
			console.log(message.data.toString('utf8'));
		});
		
		exchange.publish("some-topic", "Hello!");
		
	});
	
	
});



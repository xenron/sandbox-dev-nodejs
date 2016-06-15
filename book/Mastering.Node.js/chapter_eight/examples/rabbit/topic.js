var amqp = require('amqp');

var consumer = amqp.createConnection({ host: 'localhost', port: 5672 });

consumer.on('ready', function() {
	
	//	When all 3 queues are ready, publish.
	//
	var cnt = 3;
	var queueReady = function() {
		if(--cnt > 0) {
			return;
		}
		exchange.publish("animals.dogs.poodles", "Poodle!");
		exchange.publish("animals.dogs.dachshund", "Dachshund!");
		exchange.publish("animals.cats.shorthaired", "Shorthaired Cat!");
		exchange.publish("animals.dogs.shorthaired", "Shorthaired Dog!");
		exchange.publish("animals.misc", "Misc!");
	}
	
	var exchange = consumer.exchange('topical', {type: "topic"});
	
	consumer.queue('queue-1', function(q) {

		q.bind(exchange, 'animals.*.shorthaired');
		q.subscribe(function(message) {
			console.log('animals.*.shorthaired -> ' + message.data.toString('utf8'));
		});
		
		queueReady();
	});

	consumer.queue('queue-2', function(q) {	
		q.bind(exchange, '#');
		q.subscribe(function(message) {
			console.log('# -> ' + message.data.toString('utf8'));
		});
		
		queueReady();
	});

	consumer.queue('queue-3', function(q) {	
		q.bind(exchange, '*.cats.*');
		q.subscribe(function(message) {
			console.log('*.cats.* -> ' + message.data.toString('utf8'));
		});
		
		queueReady();
	});
});

//	# -> Poodle!
//	animals.*.shorthaired -> Shorthaired Cat!
//	*.cats.* -> Shorthaired Cat!
//	# -> Dachshund!
//	# -> Shorthaired Cat!
//	animals.*.shorthaired -> Shorthaired Dog!
//	# -> Shorthaired Dog!
//	# -> Misc!


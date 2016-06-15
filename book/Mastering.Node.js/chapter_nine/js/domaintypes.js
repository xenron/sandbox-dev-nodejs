var domain = require('domain');
var evemit = require('events').EventEmitter;
var dom = domain.create();
dom.on("error", function(err) { 
	console.log(err);
});

var somefunc = function() {
	throw new Error('Explicit bind error');
};

var emitter = new evemit;

dom.add(somefunc);
dom.add(emitter);

dom.run(function() {
	require('fs').createReadStream('foo', somefunc);
	//emitter.emit('error', new Error('emitted error'));
});

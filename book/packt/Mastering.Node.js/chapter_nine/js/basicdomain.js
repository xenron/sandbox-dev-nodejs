var domain = require('domain');
var util = require('util');

var dom = domain.create();
dom.on('error', function(err) {
	console.error('error', err.stack);
});

dom.run(function() {
	throw new Error("my domain error");
});

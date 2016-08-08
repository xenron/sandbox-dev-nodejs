var domain = require('domain');
var fs = require('fs');

var dom = domain.create();
dom.on("error", function(){ /* ... */ });

fs.readFile('somefile', dom.bind(function(err, data) {
	if(err) { throw new Error('bad file call'); }
}));
//	{ [Error: bad call]
//	domain_thrown: true,
//	...

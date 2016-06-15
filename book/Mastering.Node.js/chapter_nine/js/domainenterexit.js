var domain = require('domain');

var dom1 = domain.create();
dom1.on("error", function(err) { 
	console.log("domain 1 error");
});

var dom2 = domain.create();
dom2.on("error", function(err) {
	console.log('domain 2 error');
});

var aFuncThatThrows = function() {
	throw new Error('Explicit bind error');
};

dom1.add(aFuncThatThrows);
dom1.run(function() {
	dom1.exit();
	dom2.enter();
	aFuncThatThrows();
});
// domain 2 error
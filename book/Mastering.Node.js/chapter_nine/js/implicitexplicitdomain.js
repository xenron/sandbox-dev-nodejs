var domain = require('domain');

var dom = domain.create();
dom.on("error", function(err) { 
	console.log(err);
});

var somefunc = function() {
	throw new Error('Explicit bind error');
};

dom.add(somefunc);

dom.run(function() {
	somefunc();
});
// [Error: Explicit bind error]
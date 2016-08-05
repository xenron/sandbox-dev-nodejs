var stream = require('stream');

var converter = new stream.Transform();

converter._transform = function(num, encoding, cb) {
	this.push(String.fromCharCode(new Number(num)) + "\n")
	cb();
}

converter._flush = function(cb) {
	this.push("HI");
	cb();
}

process.stdin.pipe(converter).pipe(process.stdout);


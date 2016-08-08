//	Simple stream reader example.
//
var stream = require('stream');
var Readable = stream.Readable;
var util = require('util');

// create a constructor that will be our Reader instance. This is not
//	implemented until we add a _read method.

var Reader = function() {
	Readable.call(this);
	this.counter = 0;
}

//	Extend Reader with the Readable interface
//
util.inherits(Reader, Readable);

//	Implement Readable._read. This is reasponsible for determining what 
//	happens when #read is called on a Readable stream. 
//
Reader.prototype._read = function() {
	if(++this.counter > 10) {
		return this.push(null);
	}
	this.push(this.counter.toString());
};

//	Now create readable stream, and event handlers stream data.
//
var reader = new Reader();
reader.setEncoding('utf8');
reader.on('data', function(chunk) {
	console.log(chunk);
});
reader.on('end', function() {
	console.log('--finished--');
});

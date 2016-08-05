var domain = require('domain');
var fs = require('fs');

var dom = domain.create();
dom.on('error', function(err) {
	console.log(err);
});

//	This will intercept any errors passed by callbacks as their first argument,
//	obviating need to repetitively check if(err) { return callback(err) }
//
function readSomeFile(filename, cb) {
	fs.readFile(filename, 'utf8', dom.intercept(function(data) {
		//	Note that we no longer have to use the cb(err, data) 
		//	pattern
		//
		return cb(data);
	}));
}

//	Read a non-existent file. Note that we no longer have to handle
//	an initial error argument, as that has been handled for us
//	above. We need only look at the data should it arrive, not worry about errors.
//
readSomeFile('nofile', function(data) {
	console.log('callback called with data:\r\n' + data)
})

//	This will work normally, no errors, the console receiving
//	the contents of this file. Note again that we never have to
//	bother with checking if an error occurred.
//
readSomeFile('./domainintercept.js', function(data) {
	console.log('callback called with data:\r\n' + data)
})
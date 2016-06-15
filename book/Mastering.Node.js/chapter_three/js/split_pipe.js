var stream = require('stream');

var writable = new stream.Duplex();

writable._write = function(chunk, encoding, callback) {
	process.stdout.write(chunk)
	callback();
}

process.stdin.pipe(writable).pipe(process.stdout);
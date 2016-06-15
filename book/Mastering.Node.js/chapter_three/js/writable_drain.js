var stream = require('stream');

var writable = new stream.Writable({
	highWaterMark: 10
});

writable._write = function(chunk, encoding, callback) {
	process.stdout.write(chunk);
	callback();
}

writable.on("drain", function() {
	writable.write("Z\n");
});

var buf = new Buffer(20, "utf8");
buf.fill("A");

console.log(writable.write(buf.toString()));





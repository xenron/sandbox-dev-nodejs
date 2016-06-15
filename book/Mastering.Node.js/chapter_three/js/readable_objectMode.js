var stream = require('stream');

var Feed = function(channel) {
	var readable = new stream.Readable({
		objectMode : true
	});
	var prices = [
		{
			price : 1
		},
		{
			price : 2
		}
	];
	readable._read = function() {
		if(prices.length) {
			return readable.push(prices.shift());
		}
		readable.push(null);
	};
	return readable;
}

var feed = new Feed();

feed.on("readable", function() {
	var data = feed.read();

	data && console.log(data);
});

feed.on("end", function() {
	console.log("No more news");
});
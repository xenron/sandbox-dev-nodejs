var stream = require('stream');

var Feed = function(channel) {
	var readable = new stream.Readable({
	});
	var news = [
		"Big Win!",
		"Stocks Down!",
		"Actor Sad!"
	];
	readable._read = function() {
		console.log(news.length);
		if(news.length) {
			return readable.push(news.shift() + "\n");
		}
		readable.push(null);
	};
	return readable;
}

var feed = new Feed();

feed.on("readable", function() {
	console.log("reading");
	return;
	var data = feed.read();
	data && process.stdout.write(data);
});

feed.on("end", function() {
	console.log("No more news");
});
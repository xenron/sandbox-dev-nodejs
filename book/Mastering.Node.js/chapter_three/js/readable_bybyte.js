var stream = require('stream');

var Feed = function(channel) {
	var readable = new stream.Readable({
	});
	var news = "A long headline might go here";
	readable._read = function() {
		readable.push(news);
		readable.push(null);
	};
	return readable;
}

var feed = new Feed();

feed.on("readable", function() {
	var character;
	while(character = feed.read(1)) {
		console.log(character.toString());
	};
});

feed.on("end", function() {
	console.log("No more news");
});
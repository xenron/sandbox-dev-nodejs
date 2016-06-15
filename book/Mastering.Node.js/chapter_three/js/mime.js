var exec = require('child_process').exec;
exec("file --brief --mime pipe.js", function(err, mime) {
	console.log(mime);
});

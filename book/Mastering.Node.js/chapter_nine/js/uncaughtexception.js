process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

setTimeout(function() {
	console.log("The exception was caught and this can run.");
}, 1000);

throwAnUncaughtException();

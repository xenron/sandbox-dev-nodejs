var timeNow = require('./build/Release/callback');

timeNow(function(stamp){
	console.log(stamp);
});
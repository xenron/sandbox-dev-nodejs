var redis 	= require('redis');

var client	= redis.createClient();
var multi = client.multi();

//	Create some random hits between 12pm and 1pm
//
var secsInHour = 3600;
var pm12 = 43200;
var offset;

while(secsInHour) {

	offset = pm12 + secsInHour;
	
	multi.setbit('12to1a', offset, Math.round(Math.random(1)));
	multi.setbit('12to1b', offset, Math.round(Math.random(1)));
	multi.setbit('12to1c', offset, Math.round(Math.random(1)));
	
	--secsInHour
}

multi.exec(function() {
	client.bitop(['OR','atleastonehit','12to1a','12to1b','12to1c'], function(err) {
		client.bitcount('atleastonehit', function(err, count) {
			console.log('Of 3600 possible, how many seconds had at least one hit on one of the three targets --> ' + count);
		})
	})
})

multi.exec(function() {
	client.multi([
		["bitcount", "12to1a"],
		["bitcount", "12to1b"],
		["bitcount", "12to1c"]
	]).exec(function(err, totals) {
		console.log("Total hits between 12 and 1 over the last 3 days --> " + totals.reduce(function(prev, cur) {
			return prev + cur;
		}, 0));
	})
})




var redis 	= require('redis');
var client	= redis.createClient();
var multi = client.multi();

//	Create three articles with randomized hits representing user views
var id = 100000; 
while(id--) {
	multi.setbit('article1:today', id, Math.round(Math.random(1)));
	multi.setbit('article2:today', id, Math.round(Math.random(1)));
	multi.setbit('article3:today', id, Math.round(Math.random(1)));
}

multi.exec(function(err) {

	//	Count unique views on one article
	client.bitcount('article1:today', function(err, count) {
		console.log(count)
	})
	
	//	Count all article views
	client.multi([
		["bitcount", "article1:today"],
		["bitcount", "article2:today"],
		["bitcount", "article3:today"]
	]).exec(function(err, totals) {
		var total = totals.reduce(function(prev, cur) {
			return prev + cur;
		}, 0);
		
		console.log("Total views: ", total);
	})
	
	// count total article views of a particular user (123) -> 0-3
	client.multi([
		["getbit", "article1:today", 123],
		["getbit", "article2:today", 123],
		["getbit", "article3:today", 123]
	]).exec(function(err, hits) {
		var total = hits.reduce(function(prev, cur) {
			return prev + cur;
		}, 0);
		
		console.log(total);
	})
	
	// Did user 123 read both of these articles? true || false
	// Always true when above is 3; sometimes true when above is 2; never true
	// when above < 2
	client.multi([
		['setbit', 'user123', 123, 1],
		['bitop', 'AND','123:sawboth','user123','article1:today','article3:today'],
		['getbit', '123:sawboth', 123]
	]).exec(function(err, result) {
		var sawboth = result[2];
		console.log('123 saw both articles: ', !!sawboth);
	});
		
		
	// count total # of users who saw at least one article (OR)
	client.multi([
		['bitop', 'OR','atleastonearticle','article1:today','article2:today','article3:today'],
		['bitcount', 'atleastonearticle']
	]).exec(function(err, results) {
		console.log("At least one: ", results[1]);
	});
		
	// find users who saw one article but not another and recommend the one they missed.
	client.multi([
		['bitop','XOR','recommendother','article1:today','article2:today'],
		['bitop','AND','recommend:article1','recommendother','article2:today'],
		['bitop','AND','recommend:article2','recommendother','article1:today'],
		['bitcount', 'recommendother'],
		['bitcount', 'recommend:article1'],
		['bitcount', 'recommend:article2'],
		['del', 'recommendother', 'recommend:article1', 'recommend:article2']
	]).exec(function(err, results) {
		//	Note result offset due to first 3 setup ops
		console.log("Didn't see both articles: ", results[3]);
		console.log("Saw article2; recommend article1: ", results[4]);
		console.log("Saw article1; recommend article2: ", results[5]);
	})
});

/*

x = 0011 // 3
y = 0101 // 5

x = x ^ y // x = 0110
y = x ^ y // y = 0110 ^ 0101 = 0011 (note that this is original x)
x = x ^ y // x = 0110 ^ 0011 = 0101 (note that this is original y)

*/

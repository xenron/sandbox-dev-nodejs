var redis	= require('redis');
var client	= redis.createClient();
var multi	= client.multi();

client.multi([
	['pfadd', 'merge1', 1, 2, 3, 4, 5, 6, 10],
	['pfadd', 'merge2', 1, 2, 3, 4, 5, 6, 7, 8, 9],
	['pfmerge', 'merged', 'merge1', 'merge2'],
	['pfcount', 'merged'],
	['del', 'merge1', 'merge2', 'merged']
]).exec(function(err, result) {
	console.log('Union set cardinality', result[3]);
});
// Union set cardinality 10
var Cache = require('./');

var cache = new Cache({ prefix: 'articles:cache' });

cache.set('deploying', { foo: 'bar' })
.then(function() {
	return cache.get('deploying');
})
.then(function(val) {
	console.log(val);
	return cache.clear();
})
.then(cache.close.bind(cache));

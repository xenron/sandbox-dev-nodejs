var http   = require("http");
var server = http.createServer();

fibonacci = memoize(fibonacci);

server.on("request", function (req, res) {
	var f = fibonacci(40);

	return res.end("" + f);
});

server.listen(3000);

function fibonacci(n) {
	return (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2));
}

function memoize(f) {
	var cache = {};

	return function memoized(n) {
		return cache[n] || (cache[n] = f[n]);
	};
}

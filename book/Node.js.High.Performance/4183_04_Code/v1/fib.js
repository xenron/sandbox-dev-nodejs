var http   = require("http");
var server = http.createServer();

server.on("request", function (req, res) {
	var f = fibonacci(40);

	return res.end("" + f);
});

server.listen(3000);

function fibonacci(n) {
	return (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2));
}

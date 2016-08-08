var httpProxy = require('http-proxy');
var addresses = [
	{
		host: 'one.example.com',
		port: 80
	},
	{
		host: 'two.example.com',
		port: 80
	}
];

httpProxy.createServer(function(req, res, proxy) {
	var target = addresses.shift();
	proxy.proxyRequest(req, res, target);
	addresses.push(target);
}).listen(80);
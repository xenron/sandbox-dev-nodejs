var https = require('https');
var fs = require('fs');

new https.Server({
	key: fs.readFileSync('rsa/server-key.pem'),
    cert: fs.readFileSync('rsa/server-cert.pem')
}, function(request, response) {
	console.log("HI");
}).listen(8080)
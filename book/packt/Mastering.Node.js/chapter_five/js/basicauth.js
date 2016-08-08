var http 	= require('http');
var redis 	= require("redis");
var client	= redis.createClient();
 
http.createServer(function(req, res) {

	var auth = req.headers['authorization']; 
	if(!auth) {   
		res.writeHead(401, {'WWW-Authenticate': 'Basic realm="Secure Area"'});
		return res.end('<html><body>Please enter some credentials.</body></html>');
	}

	var tmp = auth.split(' ');   
	var buf = new Buffer(tmp[1], 'base64'); 
	var plain_auth = buf.toString();   
	var creds = plain_auth.split(':'); 
	var username = creds[0];
	var password = creds[1];

	//	Find this user record
	//
	client.get(username, function(err, data) {
		if(err || !data) {
			res.writeHead(401, {'WWW-Authenticate': 'Basic realm="Secure Area"'});
			return res.end('<html><body>You are not authorized.</body></html>');
		}
		
		res.statusCode = 200;
		res.end('<html><body>Welcome!</body></html>');
	});
}).listen(8080);


 
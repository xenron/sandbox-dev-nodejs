var http = require('http');
 
var server = http.createServer(function(req, res) {

	var auth = req.headers['authorization']; 
	console.log("Authorization Header is: ", auth);

	if(!auth) {   

		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

		res.end('<html><body>Need some creds son</body></html>');
	}

	else if(auth) {    
		var tmp = auth.split(' ');   

		var buf = new Buffer(tmp[1], 'base64'); 
		var plain_auth = buf.toString();   

		console.log("Decoded Authorization ", plain_auth);

		var creds = plain_auth.split(':');      // split on a ':'
		var username = creds[0];
		var password = creds[1];

		if((username == 'hack') && (password == 'thegibson')) {    
			res.statusCode = 200;  // OK
			res.end('<html><body>Congratulations you just hax0rd teh Gibson!</body></html>');
		}
		else {
			res.statusCode = 401; 
			res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

			res.end('<html><body>You shall not pass</body></html>');
		}
	}
});
 
server.listen(5000, function() { console.log("Server Listening on http://localhost:5000/"); });


 
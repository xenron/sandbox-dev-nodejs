var https = require('https');
var fs = require('fs');

https.createServer({
    key: fs.readFileSync('rsa/server-key.pem'),
    cert: fs.readFileSync('rsa/server-cert.pem')
}, function(req,res) {
      ...
}).listen(443)

/*
openssl genrsa -out server-key.pem 2048
openssl req -new -key server-key.pem -out server-csr.pem
openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem
*/
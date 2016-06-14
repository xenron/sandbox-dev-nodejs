var http = require('http');

var server = http.createServer();
server.on('request', function (req, res) {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  res.writeHead(404, {
    'abcd': '12345'
  });
  res.end('<h1>hello world</h1>');
});

server.listen(3001);

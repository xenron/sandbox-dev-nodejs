var httpProxy = require('http-proxy');

var proxy = httpProxy.createServer({
target: {
  host: 'www.example.com',
  port: 80
}
}).listen(8080);
var http = require('http');
var fs = require('fs');
var cloudflare = require('cloudflare');

var config = {
	"token"		: "<your auth token>",
	"email"		: "<your account email>",
	"domain"	: "<yourdomain.com>",
	"subdomain"	: "www",
	"protocol"	: "http"
};
	
var cloudflareClient = cloudflare.createClient({
	email: config.email,
	token: config.token
});	

function purge(filePath, cb) {
	var head 	= config.protocol + '://';
	var tail	= config.domain + '/' + filePath;
	
	//	foo.com && www.foo.com are two different purge events
	//	We run the callback after both are complete.
	var purgeFiles = [
		head + tail,
		head + config.subdomain + '.' + tail
	];
	
	var purgeTrack = 2;
	purgeFiles.forEach(function(pf) {
		cloudflareClient.zoneFilePurge(config.domain, pf, function(err) {
			(--purgeTrack === 0) && cb();
		});
	});
};

var indexFile = './index.html';
http.createServer(function(request, response) {
	var route = request.url;
	if(route === "/index.html") {
		response.writeHead(200, {
			"content-type"		: "text/html",
			"cache-control"		: "max-age=31536000"
		});
		return fs.createReadStream(indexFile).pipe(response);
	}
}).listen(2119)

fs.watch(indexFile, function(event, filename) {
	if(event === "change") {
		purge(filename, function(err) {
			console.log("file purged");
		});
	}
});


	

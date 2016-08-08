var http 	= require('http');
var redis 	= require('redis');
var fs		= require('fs');
var murmur 	= require('murmurhash3');

var client	= redis.createClient();

http.createServer(function(req, res) {

	var meth 	= req.method;
	var url 	= "";
	var file;

	function responder(code, msg) {
		res.writeHead(code, {
			"content-type" 						: "text/html",
			'Access-Control-Allow-Origin'  		: req.headers.origin || "*",
			'Access-Control-Allow-Headers' 		: 'Content-Type, Authorization, Content-Length, X-Requested-With'
		})
		res.end(msg || "");
	}
	
	if(meth === "OPTIONS") {
		res.writeHead({
			'Access-Control-Allow-Methods' 		: 'GET,POST,OPTIONS'
		});
		return responder(200);
	}

	if(meth === 'GET') {
		switch(req.url.substring(0,4)) {

			//	The bookmarklet panel css
			//
			case "/css": 
				file = './bitops.css';
			break;
			
			//	The bookmarklet seed code
			//
			case "/get":
				file = './bookmarklet.js';
			break;
			
			//	The bookmarklet active code -- the ajax caller, the panel loader, etc.
			//
			case "/set":
				file = './caller.js';
			break;
			
			//	The 'get bookmarklet' html file, that has the link to be bookmarkletted
			//
			case "/idx":
				file = './bitops.html';
			break;
			
			default:
			break;
		}
		
		if(file) {
			return fs.createReadStream(file).pipe(res);
		}
		
		responder(400);
		
	} else if(meth === 'POST' && req.url === "/like") {

		req
		.on('readable', function() {
			var chunk;
			while(chunk = this.read()) {
				url += chunk;
			}
		})
		.on('end', function() {
		
			if(url.trim() === "") {
				return responder(400);
			}
			
			murmur.murmur32Hex(url, function(err, hash) {

				//	Forming the key out of A:<prefix> + YYYY/MM/DD + ":" + url
				//
				var date 	= new Date();
				var today 	= date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay();
				var key 	= "A:" + today + ":" + hash
				
				//	Get the current second, today
				//	elapsedSecondsThisMinute + (60seconds * (minutesElapsedCurrentHour + (60minutes * elapsedHoursToday)))
				//
				var secs = date.getSeconds() + (60 * (date.getMinutes() + (60 * date.getHours())));
				
				//	Set #secs bit on #key
				//
				client.setbit(key, secs, 1, function(err) {
					if(err) {
						return responder(500);
					}
					client.bitcount(key, function(err, cnt) {
						if(err) {
							return responder(500);
						}
	
						return responder(200, "" + cnt);
					})
				})
			})
		})
		
	} else {
	
		responder(400);
	}

}).listen(8080);
var http 	= require('http');
var url	 	= require('url');
var fs		= require('fs');

http.createServer(function(request, response) {
	var parse = url.parse(request.url, true);
	
	if(request.url === '/favicon.ico') {
		response.writeHead(200, {
			'Content-Type': 'image/x-icon'
		});
		return response.end();
	}
	
	if(!parse.query.symbol) {
		return fs.readFile('./stocks.html', function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}
	
	var yql			= "http://query.yahooapis.com/v1/public/yql?q=";
	var dataFormat	= "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	var query 		= yql + "select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + parse.query.symbol + "%22)" + dataFormat;
	
	http.get(query, function(res) {

		var data = "";

		res
		.on('readable', function() {
			var d;
			while(d = this.read()) {
				data += d;
			}
		})
		.on('end', function() {
		
			var out = {};
			
			try {
				data = JSON.parse(data);
				out.quote = data.query.results.quote;
				out.callIn = 5000;
				
				var p;
				var oq = out.quote;
				var v;
				
				//	Creating artificial change (random)
				//	Normally, the data source would change regularly.
				//
				for(p in oq) {
					v = oq[p];
					if(v * 1 == v) {
					 	out.quote[p] = +v + Math.round(Math.random());
					}
				}
				
			} catch(e) {
				out = {
					error: "Received empty data set",
					callIn: 10000
				};
			}
		
			response.writeHead(200, {
				"Content-type" : "application/json"
			});
			response.end(JSON.stringify(out));
		});
	}).on('error', function(e) {
		response.writeHead(200, {
			"Content-type" : "application/json"
		});
		response.end(JSON.stringify({
			error: "System Error",
			callIn: null
		}));
	});
}).listen(2112);
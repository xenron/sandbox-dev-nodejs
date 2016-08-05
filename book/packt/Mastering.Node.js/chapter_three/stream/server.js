var http 	= require('http');
var url 	= require('url');
var jsdom 	= require('jsdom');
var spawn 	= require('child_process').spawn;
var fs		= require('fs');
var stream	= require('stream');
var width 	= 200;
var height 	= 200;

var writer = function(request, response) {

  	if(request.url === '/favicon.ico') {
  		response.writeHead(200, {
  			'Content-Type': 'image/x-icon'
  		});
  		return response.end();
  	}
  	
	var values 		= url.parse(request.url, true).query['values'].split(",");
  	var cacheKey 	= values.sort().join('');
 	
  	fs.exists(cacheKey, function(exists) {
  	
  		response.writeHead(200, {
  			'Content-Type': 'image/png'
  		});
  	
  		if(exists) {
  			fs.createReadStream(cacheKey)
  			.on('readable', function() {
  				var chunk;
  				while(chunk = this.read()) {
  					response.write(chunk);
  				}
  			})
  			.on('end', function() {
  				response.end();
  			});
  			
  			return;
  		}
  		
		jsdom.env({
			features: {
				QuerySelector : true
			}, 
			html : '<!DOCTYPE html><div id="pie" style="width:' + width + 'px;height:' + height + 'px;"></div>', 
			scripts	: [
				"d3.min.js",
				"d3.layout.min.js",
				"pie.js"
			], 
			done : function(err, window) {
			
				var svg 		= window.insertPie("#pie", width, height, values).innerHTML;
				var svgToPng 	= spawn("convert", ["svg:", "png:-"]);
				
				var filewriter 	= fs.createWriteStream(cacheKey);
				
				filewriter.on("open", function(err) {
				
					var streamer = new stream.Transform(); 
					
					streamer._transform = function(data, enc, cb) {
						filewriter.write(data);
						this.push(data);
						cb();
					};
		
					svgToPng.stdout.pipe(streamer).pipe(response);
					
					svgToPng.stdout.on('finish', function() {
						response.end();
					});
					
					//	jsdom's domToHTML will lowercase element names
					//
					svg = svg.replace(/radialgradient/g,'radialGradient');
					
					svgToPng.stdin.write(svg);
					svgToPng.stdin.end();
					
					window.close();
				});
			}
		});  		
  	})
}

http.createServer(writer).listen(8000);

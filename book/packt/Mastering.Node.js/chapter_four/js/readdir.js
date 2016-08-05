var fs 		= require('fs');

var walk = function(dir, done, emitter) {
	var results = {};
	emitter = emitter || new (require('events').EventEmitter);
	
	fs.readdir(dir, function(err, list) {
	
		var pending = list.length;
		
		if(err || !pending) {
			return done(err, results);
		}

		list.forEach(function(file) {
		
			var dfile = dir + "/" + file;
			fs.stat(dfile, function(err, stat) {
				
				//	You might want to check for errors here as well.
				if(err) {
					throw err;
				}
				if(stat.isDirectory()) {
					emitter.emit('directory', dfile, stat);
					return walk(dfile, function(err, res) {
						results[file] = res;
						!--pending && done(null, results);
					}, emitter);
				} 
				
				emitter.emit('file', dfile, stat);
				results[file] = stat;
				!--pending && done(null, results);
			});
		});
	});
	
	return emitter;
};

walk(".", function(err, res) {
	console.log(require('util').inspect(res, {depth: null}));
}).on("directory", function(path, stat) {
	console.log("Directory: " + path + " - " + stat.size);
})
.on("file", function(path, stat) {
	console.log("File: " + path + " - " + stat.size);
});


var memwatch   = require("memwatch-next");
var leakObject = null;

function MemoryLeak() {
	var originalObject = leakObject;

	leakObject = {
		longString : new Array(1000000).join("*"),
		someMethod : function () {
			console.log(originalObject);
		}
	};
};

setInterval(MemoryLeak, 1000);

memwatch.on("leak", function (info) {
	console.log("GC leak detected: %d bytes growth", info.growth);
});

memwatch.on("stats", function (stats) {
	console.log("GC stats: %d cycles, %s bytes", stats.num_full_gc, stats.current_base);
});

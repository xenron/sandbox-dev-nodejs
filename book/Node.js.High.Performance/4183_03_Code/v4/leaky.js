var memwatch   = require("memwatch-next");
var heapdiff   = new memwatch.HeapDiff();
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

setTimeout(function () {
	console.log(heapdiff.end());
}, 10000);

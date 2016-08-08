require("v8-profiler");

var leakObject   = null;

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

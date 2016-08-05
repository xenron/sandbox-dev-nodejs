Object.defineProperty(Error, '__STACK', {
	get	: function() {
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack) {
			return stack;
		};
		var err = new Error;
		Error.captureStackTrace(err, arguments.callee);
		var stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
});

Object.defineProperty(Error, 'MAP', {
	get	: function() {
		var es = Error.__STACK[1];
		return {
			line		: es.getLineNumber(),
			column		: es.getColumnNumber(),
			funcName	: es.getFunctionName(),
			funcBody	: es.getFunction().toString(),
			fileName	: es.getFileName()
		}
	}
});

function foo() {
    console.log(Error.MAP);
}

foo();



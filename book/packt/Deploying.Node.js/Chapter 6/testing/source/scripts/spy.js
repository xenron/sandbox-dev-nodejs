var sinon = require('sinon');
var argA = "foo";
var argB = "bar";
var callback = sinon.spy();
 
callback(argA); 
callback(argB);

console.log(
	callback.called,
	callback.callCount,
	callback.calledWith(argA),
	callback.calledWith(argB),
	callback.calledWith('baz')
);
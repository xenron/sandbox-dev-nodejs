var util = require('util');
var obj = function() {
	this.foo = "bar";
};
obj.prototype.inspect = function() {
	return "CUSTOM INSPECTOR";
}
console.log(util.inspect(new obj))
//	CUSTOM INSPECTOR
console.log(util.inspect(new obj, { customInspect: false }))
// 	{ foo: 'bar' }
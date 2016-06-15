var assert = require('assert');

var a = [1,2,3];
var b = [1,2,3];

assert.deepEqual(a, b);		// passes
assert.strictEqual(a, b);	// throws Assertion error

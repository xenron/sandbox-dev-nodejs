/*
var assert = require('assert');

assert.throws(function() {
	throw new Error("Wrong value");
}, TypeError);
*/

try { 
	assert.fail(1,2,"Bad!","NOT EQ") 
} catch(e) { 
	console.log(e) 
}

{ message: 'Bad!',
  actual: 1,
  expected: 2,
  operator: 'NOT EQ',
  name: 'AssertionError: Bad!' }
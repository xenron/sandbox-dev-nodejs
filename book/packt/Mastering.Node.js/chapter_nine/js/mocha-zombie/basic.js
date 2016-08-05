var zombie 	= require("zombie");
var assert 	= require("assert");
var count 	= 0;
var testFramework = function(meth, v1, v2) {
	++count;
	try {
		assert[meth](v1, v2);
		console.log("Test " + count + " OK!");
	} catch(e) {
		console.log("Test " + count + " Error!");
		console.log(e);
	}
}
browser = new zombie();
browser.visit("http://localhost:8000/login.html", function() {
	testFramework("ok", browser.success);
	testFramework("ok", browser.query('#nonexistentId'));
});
//	Test 1 OK!
//	Test 2 Error!
//	{ name: 'AssertionError',
//	  actual: undefined,
//	  expected: true,
//	  operator: '==',
//	  message: '"undefined" == true' }
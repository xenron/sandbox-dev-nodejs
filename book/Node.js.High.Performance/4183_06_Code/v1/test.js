var assert = require("assert");
var m      = require("./module");

describe("module.add()", function () {
	it("should add two numbers", function () {
		assert.equal(m.add(2, 3), 5);
	});
});

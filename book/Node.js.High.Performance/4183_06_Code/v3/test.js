var assert = require("assert");
var m      = require("./module");

describe("module.add()", function () {
	it("should add two numbers", function () {
		assert.equal(m.add(2, 3), 5);
	});

	it("should return null when one is not a number", function () {
		assert.equal(m.add(2, "a"), null);
	});
});

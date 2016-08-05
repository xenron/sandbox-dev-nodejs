days = require('../../build/js/sample.js')
assert = require("assert")
describe "days() data", ->
	it "should have a length of 7", ->
		assert.equal days().length, 7
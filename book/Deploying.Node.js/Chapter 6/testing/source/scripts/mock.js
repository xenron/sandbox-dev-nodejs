var sinon = require('sinon');
var Utils = require('./Utils.js');

var utils = new Utils();
var arr = ['a','b','c','d','e'];

var mock = sinon.mock(utils);
 
// Expectations
mock.expects("capitalize").exactly(5).withArgs.apply(sinon, arr);

arr.map(utils.capitalize);
console.log(mock.verify());
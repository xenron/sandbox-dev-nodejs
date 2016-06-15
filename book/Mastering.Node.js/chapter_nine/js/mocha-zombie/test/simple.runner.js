var http	= require('http');
var assert 	= require('assert');
var zombie 	= require('zombie');

var server = http.createServer(require('../server.js')).listen(8000);

describe('Simple Login Test', function() {

	this.browser = new zombie({ site: 'http://localhost:8000' });
	this.browser.visit('/login.html');

	it('should have an input with id of #email', function() {
		assert.ok(this.browser.success);
		assert.ok(this.browser.query('input#email'));
	});
	
	it('should have an input with id of #password', function() {
		assert.ok(this.browser.success);
		assert.ok(this.browser.query('input#password'));
	});
});
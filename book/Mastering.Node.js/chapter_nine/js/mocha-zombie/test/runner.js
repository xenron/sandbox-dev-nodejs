var http	= require('http');
var assert 	= require('assert');
var zombie 	= require('zombie');

var server = http.createServer(require('../server.js')).listen(8080);

describe('Test Login Page', function() {

	before(function() {
		this.browser = new zombie({ site: 'http://localhost:8080' });
	});
	
	beforeEach(function(done) {
		this.browser.visit('/login.html', done);
	});

	it('should have a login form header', function() {
		assert.ok(this.browser.success);
		assert.equal(this.browser.text('h1'), 'Login');
	});
	
	it('should have an input with id of #email', function() {
		assert.ok(this.browser.success);
		assert.ok(this.browser.query('input#email'));
	});
	
	it('should have an input with id of #password', function() {
		assert.ok(this.browser.success);
		assert.ok(this.browser.query('input#password'));
	});

	it('should reject empty field submissions', function(done) {
		var browser = this.browser;
		browser.pressButton('Sign In').then(function() {
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Login');
			assert.equal(browser.query('div#warn'));
		}).then(done, done);
	});

	after(function(done) {
		server.close(done);
	});
});
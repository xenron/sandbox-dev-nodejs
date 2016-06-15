var Utils = require('../scripts/Utils');

describe('Running tests', function() {
	describe('Testing Utils', function() {
		var utils = new Utils();
		
		it('capitalizes a string', function() {
			var result = utils.capitalize('foobar');
			expect(result).to.be.a('string').and.equal('FOOBAR');
		});
	});
});

var http = require('http');

module.exports = function() {
	this.makeCall = function(url, cb) {
		http.get(url, function(res) {
			cb(this.parseResponse(res));
		}.bind(this))
	}
	this.parseResponse = function(res) {
		if(!res.statusCode) {
			throw new Error('No status code present');
		}
		switch(res.statusCode) {
			case 200:
				return 'handled';
			break;
			case 404:
				return 'handled';
			break;
			default:
				return 'not handled';
			break;
		}
	}
}
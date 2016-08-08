var Utils = function() {
	this.capitalize = function(str) {
		return str.split('').map(function(char) {
			return char.toUpperCase();
		}).join('');
	};
};

module.exports = Utils;
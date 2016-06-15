// add a with b
exports.add = function (a, b) {
	if (isNaN(a) || isNaN(b)) {
		return null;
	}
	return a + b;
};

var http = require('http');
var sinon = require('sinon');

sinon.stub(http, 'get').yields({
	statusCode: 404
});

// This URL is never actually called
http.get("anyURLWillDo", function(res) {
	console.log("Got response: " + res.statusCode);
	http.get.restore();
})
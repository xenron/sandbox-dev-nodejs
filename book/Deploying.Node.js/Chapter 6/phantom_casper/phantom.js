var phantom = require('phantom');

phantom.create(function(ph) {
	ph.createPage(function(page) {
		page.open("http://www.example.org", function(status) {
			page.evaluate(function() { 
				return document.title;
			}, function(title) {
				console.log('Page title: ' + title);
				ph.exit();
			});
		});
	});
});
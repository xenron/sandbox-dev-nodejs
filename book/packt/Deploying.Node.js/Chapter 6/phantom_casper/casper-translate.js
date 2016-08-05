casper.start('http://translate.google.com/', function() {
	this
	.sendKeys('#source', 'Ciao')
	.waitForText('Hello')
	.then(function() {
		this.test.assertSelectorHasText('#result_box', 'Hello');
	})
	.then(function() {
		this.capture('snapshot.png');
	});
});

casper.run();
casper.start('http://google.com/', function() {
	this
	.thenEvaluate(function(term) {
		document.querySelector('input[name="q"]').setAttribute('value', term);
		document.querySelector('form[name="f"]').submit();
	}, 'node.js')
	.then(function() {
		this.click('h3.r a');
	})
	.then(function() {
		this.echo('New location: ' + this.getCurrentUrl());
	});
});
casper.run();

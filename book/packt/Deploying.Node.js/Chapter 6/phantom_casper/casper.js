casper.start('http://example.org/', function() {
    this.echo('Page title: ' + this.getTitle());
});

casper.run();

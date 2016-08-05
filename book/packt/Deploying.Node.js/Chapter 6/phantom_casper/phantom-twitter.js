var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
        	
var twitterId = system.args[1];

page.open(encodeURI("http://mobile.twitter.com/" + twitterId), function(status) {
	if(!status) {
		throw new Error("Can't connect to Twitter!");
	}
	var tweets = page.evaluate(function() {
		var _tweets = [];
		var coll = Array.prototype.slice.call(document.querySelectorAll('div.tweet-text'))
		coll.forEach(function(tweet) {
			_tweets.push(tweet.innerText);
		});
		return _tweets
	});
	fs.write(twitterId + '.json', JSON.stringify(tweets));
    phantom.exit();
});
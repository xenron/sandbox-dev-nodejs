var GitHubApi = require("github");

github.authenticate({
	type: "oauth",
	token: <your token>
})

github.repos.createHook({
	"user": <your github username>,
	"repo": <github repo name>,
	"name": "web",
	"secret": <any secret string>,
	"active": true,
	"events": [
		"push"
	],
	"config": {
		"url": "http://yourserver.com/git-webhook",
		"content_type": "json"
	}
}, function(err, resp) {
	...
});
var express = require('express');
var passport = require('passport');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

//	Create our examples bucket. 
//	Since we will re-use the same bucket, it is better to set the bucket name
//	as a "global" for all S3 methods.
//
var S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs.examples'
	}
});

S3.createBucket(function(err) {
	if(err) {
		throw new Error("Unable to properly connect to data store.");
	}
});

var FacebookStrategy = require('passport-facebook').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
		clientID		: 'your-id',
		clientSecret	: 'your-secret',
		callbackURL		: "http://www.pathjs.com/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		
		//	Check if a user with this FacebookID exists in our database.
		//	If not, create the user record on S3.
		//
		//	Here is where you would add new data, modify the facebook profile
		//	data for your purposes, etc.
		//
		profile.local = {
			lastLogin : new Date().getTime(),
			sessionId : parseInt(Math.random() * 100000)
		}
		
		var s3Obj = {
			Key						: profile.id,
			Body					: JSON.stringify(profile),
			ServerSideEncryption	: "AES256",
			ContentType				: "application/json",
			ACL						: "private"
		}
		
		S3.putObject(s3Obj, function(err, data) {
			if(err) {
				return done(err);
			} 
			
			return done(err, profile);
		});
	}
));

var app = express();

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'mastering nodejs' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render('index', { 
		user: req.user 
	});
});

//	Connect with Facebook, which will handle login. Once logged in
//	the user will be redirected to /auth/facebook/callback
//
app.get('/auth/facebook', passport.authenticate('facebook'));

//	Handle Facebook response
//	Here we redirect both failure and success back to our index template,
//	as defined by app.get('/');
//
app.get(
	'/auth/facebook/callback', 
	passport.authenticate('facebook', { 
		failureRedirect: '/' 
	}),
	function(req, res) {
    	res.redirect('/');
  	}
);

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.listen(2112);

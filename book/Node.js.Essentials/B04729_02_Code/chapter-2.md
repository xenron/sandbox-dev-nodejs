# Chapter 2

----------

Now we have the basics down we can get to something a bit more useful. In this chapter we will look into creating an http server and routing requests. You will come across this very often when working with Node as server side scripting is one of the common uses of Node. 

Node comes with an http server built in, all you need to do is require the include `http` package and create a server. You can read more about the package at https://nodejs.org/api/http.html 

	var Http = require( 'http' );
		
	var server = Http.createServer( );
	
This will create your very own http server which is ready to roll. In this state though it won't be listening for any requests. We can start listening on any port or socket we wish, as long as it is available.

	var Http = require( 'http' );
		
	var server = Http.createServer( );
	server.listen( 8000, function( ) {
		console.log( 'Listening on port 8000' ); 
	});
	
Lets save this code to `server.js` and run it

	[~/examples/example-4]$ node server.js
	Listening on port 8000

By going to your browser and opening `http://localhost:8000/` you will see that the request has been accepted, by the server isn't responding, this is because we haven't handled the request yet, we are just asking for them.

When we create the server we can pass a callback that will be called each time there is a request, the parameters passed will be `request, response`.

	function requestHandler( request, response ) {
	}

	var server = Http.createServer( requestHandler );

Now each time we get a request we can do something:

	var count = 0;
	function requestHandler( request, response ) {
		var message;
		count += 1;
		response.writeHead( 201, {
			'Content-Type': 'text/plain'
		});
			
		message = 'Visitor count: ' + count;
	
		console.log( message );
		response.end( message );
	}

Lets run the script and request the page from the browser, you should see `Visitor count: 1` returned to the browser

	[~/examples/example-4]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Visitor count: 1
	Visitor count: 2

Something weird has happened though, an extra request was generated. Who is visitor 2?

`http.IncomingMessage` ( aka `request` ) exposes a few properties that we can use to figure this out. The property we are most interested right now is `url`, we are expecting just `/` to be requested, so lets add this to our message

	message = 'Visitor count: ' + count + ', path: ' + request.url;

And run the code, you will see now whats going on, `/favicon.ico` has been requested as well. If you aren't seeing this then you have probably been wondering what I have been going on about, or your browser has been to `http://localhost:8000` recently and already has a cached icon, if this is the case you can request the icon manually for example `http://localhost:8000/favicon.ico`

	[~/examples/example-4]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Visitor count: 1, path: /
	Visitor count: 2, path: /favicon.ico

From this we can also see that if we request any other page we will get the correct path

	[~/examples/example-4]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Visitor count: 1, path: /
	Visitor count: 2, path: /favicon.ico
	Visitor count: 3, path: /test
	Visitor count: 4, path: /favicon.ico
	Visitor count: 5, path: /foo
	Visitor count: 6, path: /favicon.ico
	Visitor count: 7, path: /bar
	Visitor count: 8, path: /favicon.ico
	Visitor count: 9, path: /foo/bar/baz/qux/norf
	Visitor count: 10, path: /favicon.ico

This isn't the desired outcome though, for everything but a few *routes* we want to return `404: Not Found`


----------

### Introducing Routing 

Routing is essential for almost all Node servers, first we will implement our own simple version and then move onto more complex routing

We can implement our own simple router using a `switch` statement

	function requestHandler( request, response ) {
		var message,
			status = 200;

		count += 1;
	
	
		switch( request.url ) {
			case '/count':
				message = count.toString( );
				break;
			case '/hello':
				message = 'World';
				break;
			default: 
				status = 404;
				message = 'Not Found';
				break;
		}
	
		response.writeHead( 201, {
			'Content-Type': 'text/plain'
		});
		console.log( request.url, status, message );
		response.end( message ); 
	}

Lets run this example
	
	[~/examples/example-4]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	/foo 404 Not Found
	/bar 404 Not Found
	/world 404 Not Found
	/count 200 4
	/hello 200 World
	/count 200 6

You can see the count increasing each request, however it isn't returned each time. If we haven't specifically defined a case for that route we return `404: Not Found`

For services that implement a RESTful interface we also want to be able to route requests based on the http method being used as well, the `request` object exposes this using the `method` property.

Adding this to the log we can see this, using a rest client you can also do a `POST` request	

	console.log( request.method, request.url, status, message );
	
Run the example and do your requests:

	[~/examples/example-4]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	GET /count 200 1
	POST /count 200 2
	PUT /count 200 3
	DELETE /count 200 4

We could implement a router to route based on method, but there are already packages out there that do this for us, for now we will a simple package called `router`

	[~/examples/example-5]$ npm install router
	
Now using a router we can do some more complex routing of our requests

Lets create a simple restful interface

First we need to create the server

	/* server.js */
	var Http = require( 'http' ),
		Router = require( 'router' ), 
		server,
		router; 

	router = new Router( );
	
	server = Http.createServer( function( request, response ) {
		router( request, response, function( error ) {
			if( !error ) {
				response.writeHead( 404 );
			} else {
				//Handle errors
				console.log( error.message, error.stack );
				response.writeHead( 400 );
			}		
			response.end( '\n' );
		});
	});
		
	server.listen( 8000, function( ) {
		console.log( 'Listening on port 8000' );
	});
	
Running the server should show that the server is listening:

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000

We want to define a simple interface to read, save and delete messages, we will want to read individual messages and a list of messages

The endpoints we want to define are:

| HTTP Method | Endpoint     | Used to        |
|-------------|--------------|----------------|
| POST        | /message     | Create message |
| GET         | /message/:id | Read message   |
| DELETE      | /message/:id | Delete message |
| GET         | /message     | Read messages  |

For each http method the router has a method to use to map a route, the routers api is in the form of 

	router.<http method>( <path>, [ ... <handler> ] )

For each route we can define multiple handlers, but we will come back to that in a moment

We will go through each route and create an implementation, we will append the code to the end of `server.js`

We want to store our messages somewhere, in the real world we would store this in a database, but for simplicity an array will be used with a simple counter

	var counter = 0,
		messages = { };

Our first route will be used to create messages

	function createMessage( request, response ) {
		var id = counter += 1 ;
		console.log( 'Create message', id );
		response.writeHead( 201, {
			'Content-Type': 'text/plain'
		});
		response.end( 'Message ' + id );
	}

	router.post( '/message', createMessage ); 

We can ensure this route works by running the server and doing a POST request to `http://localhost:8000/message`

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Create message 1
	Create message 2
	Create message 3

We can also confirm the counter is incrementing by the id increasing each time we do a request, will will do this to keep track of the count of messages and to give a *unique* id to each message

Now that we have that working we have to be able to read the message text, to do that we need to be able to read the request body that was sent by the client, this is where multiple handlers come into play, we can tackle this two different ways, if we were only reading the body in one route, or we were doing some other action specific to a route, for instance authorisation, we would add an additional handler to the route like so

	router.post( '/message', parseBody, createMessage ) 

The other way we could do it is to add a handler for all methods and routes, this will be executed before and specific route handler and are commonly referred to as middleware, you can think of handlers as being in a chain of functions, each one calling next once it has finished with its tasks, with this in mind you should take note that the order you add a handler will dictate the order of operations. This means that if we are registering a handler that is executed for all methods we must do this first.
	
The router exposes a function to add these handlers.

	router.use( function( request, response, next ) {
		console.log( 'middleware executed' );
		// Null as there were no errors
		// If there was an error then we could call `next( error );`
		next( null );
	});

You can add this code just above our *implementation* of `createMessage`

Once you have done that run the server and make a request

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	middleware executed
	Create message 1

You can see that the middleware was executed before the route handler was executed

Now that we know how middleware works we can use them

	[~/examples/example-5]$ npm install body-parser

Replace our custom middleware with
	
	var BodyParser = require( 'body-parser' );
	
	router.use( BodyParser.text( ) );

At this stage we just want to read all requests as plain text

Now in `createMessage` we can retrieve the message

	function createMessage( request, response ) {
		var id = counter += 1,
			message = request.body;
			
		console.log( 'Create message', id, message );
	
		messages[ id ] = message;
	
		response.writeHead( 201, {
			'Content-Type': 'text/plain',
			'Location': '/message/' + id 
		});
	
		response.end( message );
	}

Run `server.js` and POST a couple of messages to `http://localhost:8000/message`, you will see something similar to these messages

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Create message 1 Hello foo
	Create message 2 Hello bar

If you noticed you would have seen that a header is returned with the new location of the message and its id, if we request `http://localhost:8000/message/1` we will expect the content from the first message to be returned.

Something is a bit different with this route though, it has a key that will generated each time a message is created, we don't want to set up a new route for each new message as that would be highly in-efficient, in stead we create a route that matches a pattern such as `/message/:id`, this is a common way to define a dynamic route in node. 

The *id* part of the route is called a parameter, we can define as many of these as we want in our route and reference them using the request, for example we could have a route similar to `/user/:id/profile/:attribute`  

With this in mind we can create our `readMessage` handler

	function readMessage( request, response ) {
		var id = request.params.id,
			message = messages[ id ];

		console.log( 'Read message', id, message );
		
		response.writeHead( 200, {
			'Content-Type': 'text/plain'
		});
	
		response.end( message );
	}

	router.get( '/message/:id', readMessage );

Now run the server 

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Create message 1 Hello foo
	Read message 1 Hello foo
	Create message 2 Hello bar
	Read message 2 Hello bar
	Read message 1 Hello foo

By sending a few requests to the server we can see this working

Deleting messages is almost exactly the same as reading them, just in this case we don't return anything and null out the value

	function deleteMessage( request, response ) {
		var id = request.params.id;
	
		console.log( 'Delete message', id );
	
		messages[ id ] = undefined;
	
		response.writeHead( 204, { } );
	
		response.end( '' );
	}
	
	router.delete( '/message/:id', deleteMessage )

Run the server, then create, read and delete a message

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Delete message 1
	Create message 1 Hello
	Read message 1 Hello
	Delete message 1
	Read message 1 undefined

That looks good, however we have run into a problem, after deleting a message we shouldn't be able to read it again, lets return 404 in both the read and delete if we can't find a message by adding this code to our methods

		var id = request.params.id,
			message = messages[ id ];
		
		if( typeof message !== 'string' ) {
			console.log( 'Message not found', id );
	
			response.writeHead( 404 );
			response.end( '\n' );
			return;
		} 

Now when we run the server

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Message not found 1
	Create message 1 Hello
	Read message 1 Hello

Lastly we want to be able to read all messages, we will return a list of all message values

	function readMessages( request, response ) {
		var id,
			message,
			messageList = [ ],
			messageString;

		for( id in messages ) {
			if( !messages.hasOwnProperty( id ) ) {
				continue;
			}
			message = messages[ id ];
			// Handle deleted messages
			if( typeof message !== 'string' ) {
				continue;
			}
			messageList.push( message );
		}
		
		console.log( 'Read messages', JSON.stringify( 
			messageList, 
			null, 
			'  ' 
		));
		
		messageString = messageList.join( '\n' );
		 
 		response.writeHead( 200, {
			'Content-Type': 'text/plain'
		});
	
		response.end( messageString );
	}
	
	router.get( '/message', readMessages );
	
Lets run the server

	[~/examples/example-5]$ node server.js                                                                                                                                                                                                                                         
	Listening on port 8000
	Create message 1 Hello 1
	Create message 2 Hello 2
	Create message 3 Hello 3
	Create message 4 Hello 4
	Create message 5 Hello 5
	Read messages [
	  "Hello 1",
	  "Hello 2",
	  "Hello 3",
	  "Hello 4",
	  "Hello 5"
	]

Awesome, now we have a full RESTful interface to read and write messages, but we don't want everyone to be able to read our messages, we want them secure, we would also like to know who is creating messages as well. 

A great module is **passport**, another kind of middleware that helps us authenticate requests

Passport exposes a simple API for providers to expand on and create *strategies* for authenticating users. At the time of writing there are 307 officially supported strategies, however there is no reason why you can't write your own and publish it. 

The simplest strategy for passport is the local strategy which accepts a username and password

For these examples we will introduce the express framework, now that you know the basics of how it all works underneath we can put it all together. 

You can install *express*, "body-parser", *passport* and *passport-local* using

	[~/examples/example-19]$ npm install express body-parser passport passport-local

For now we can store our users in a simple object to reference later

	var users = {
		foo: {
			username: 'foo',
			password: 'bar',
			id: 1
		},
		bar: {
			username: 'bar',
			password: 'foo',
			id: 2
		}
	}

Once we have some users we need to set up passport, when we create an instance of the local strategy we need to provide a verify callback where we check the username and password, while returning a user.
	
	var Passport = require( 'passport' ),
		LocalStrategy = require( 'passport-local' ).Strategy;
	
	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	  },
	  function(username, password, done) {
	    user = users[ username ];

		if ( user == null ) {
			return done( null, false, { message: 'Invalid user' } ); 
		}
		
		if ( user.password !== password ) {
			return done( null, false, { message: 'Invalid password' } );	
		}
	
		done( null, user );
	  }
	)

The verify callback in this case is expecting *done* to be called with a user, it also allows us to provide information if the user was invalid or the password was wrong 

Now that we have a strategy we can pass this to passport which allows us to reference it later and use to authenticate our requests

	Passport.use( 'local', localStrategy );

You can use multiple strategies per application and reference each one by the name you passed, in this case `'local'`

Now lets create our server

	var Express = require( 'express' );
	
	var app = Express( );

We will need to use the body parser middleware, this will ensure that when we post to our login route, we can read our body, we also need to initialise passport and the express router

	
	var BodyParser = require( 'body-parser' );
	
	app.use( BodyParser.urlencoded( { extended: false } ) );
	app.use( BodyParser.json( ) );
	app.use( Passport.initialize( ) );

To login to our application we will want to create a *post* route that uses authentication as one of the handlers

	app.post( 
		'/login',
		Passport.authenticate( 'local', { session: false } ),
		function ( request, response ) {
			
		}
	);

Now when we send a POST request to `/login` the server will authenticate our requests

Once authenticated the `user` property will be populated on the request object

	app.post( 
		'/login',
		Passport.authenticate( 'local', { session: false } ),
		function ( request, response ) {
			response.send( 'User Id ' + request.user.id );
		}
	);

Lastly we need to listen for requests, as with all the other servers

	app.listen( 8080, function( ) {
		console.log( 'Listening on port 8080' );
	});

Lets run the example

	[~/examples/example-19]$ node server.js
	Listening on port 8080

Now when we send a POST request at our server we can authenticate users

If the user hasn't passed both their username and password the server will return `500 Bad Request`

	[~]$ curl -X POST http://localhost:8080/login -v
	< HTTP/1.1 400 Bad Request
	
If the user provided the wrong details then `401 Unauthorized` will be returned

	[~]$ curl -X POST http://localhost:8080/login \
			-H 'Content-Type: application/json' \
			-d '{"username":"foo","password":"foo"}' \
			-v
	< HTTP/1.1 401 Unauthorized
	
If we provide the correct details we can see our handler was called and the correct data returned

	[~]$ curl -X POST http://localhost:8080/login \
			-H 'Content-Type: application/json' \
			-d '{"username":"foo","password":"bar"}'
	User Id 1
	[~]$ curl -X POST http://localhost:8080/login \
			-H 'Content-Type: application/json' \
			-d '{"username":"bar","password":"foo"}'
	User Id 2

Now that we have an authenticated user we can generate a token that can be used with the rest of our requests rather than passing our username and password everywhere, this is commonly known as a Bearer token, and there is conveniently a passport strategy for this.

For our tokens we will use something called a JSON Web Token, or JWT for short. 

JWT allows us to encode tokens from JSON objects, decode them, and verify them. The data stored in them are open and simple to read so passwords shouldn't be stored in them, however to verify a user it is very simple. We can also provide these tokens with expiry dates which helps limit the severity of tokens being exposed. 

You can read more about JWT at http://jwt.io/ 

We can install JWT using 

	[~/examples/example-19]$ npm install jsonwebtoken

Once a user is authenticated, we can safely provide them with a token to use in future requests

	var JSONWebToken = require( 'jsonwebtoken' ),
		Crypto = require( 'crypto' );
	
	app.post( 
		'/login',
		Passport.authenticate( 'local', { session: false } ),
		function ( request, response ) {
			var user = request.user;	
			// The payload just contains the id of the user
			// and their username, we can verify whether the claim
			// is correct using JSONWebToken.verify		
			var payload = {
				id: user.id,
				username: user.username	
			};
			// Generate a random string
			// Usually this would be an app wide constant
			// But can be done both ways
			var secret = Crypto.randomBytes( 128 )
							   .toString( 'base64' );
		    // Create the token with a payload and secret
			var token = JSONWebToken.sign( payload, secret );
			
			// The user is still referencing the same object
			// in users, so no need to set it again
			request.user.secret = secret
	
			// Return the user a token to use
			response.send( token );
		}
	);
	
Now when the user logs in they will be presented with a token to use that we can verify

Lets run our server

	[~/examples/example-19]$ node server.js
	Listening on port 8080

When we login now we receive a token

	[~]$ curl -X POST http://localhost:8080/login \
				-H 'Content-Type: application/json' \
				-d '{"username":"foo","password":"bar"}'
	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZC
	I6MSwidXNlcm5hbWUiOiJmb28iLCJpYXQiOjE0MzcyO
	TQ3OTV9.iOZO7oCIceZl6YvZqVP9WZLRx-XVvJFMF1p
	pPCEsGGs

We can enter this into the debugger at http://jwt.io/ and see the contents

	{
	  "id": 1,
	  "username": "foo",
	  "iat": 1437294795
	}

If we had the secret we could verify the token is correct

Each time we request a token the signature changes

	[~]$ curl -X POST http://localhost:8080/login \
					-H 'Content-Type: application/json' \
					-d '{"username":"foo","password":"bar"}'
	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZC
	I6MSwidXNlcm5hbWUiOiJmb28iLCJpYXQiOjE0MzcyO
	TQ5OTl9.n1eRQVOM9qORTIMUpslH-ycTNEYdLDKa9lU
	pmhf44s0

We can authenticate a user using this using `passport-bearer`, it is set up in a very similar way to `passport-local`, however rather than accepting a username and password from the body, we accept a *bearer token*, this can be passed using the query string, body, or the `Authorization` header

First we must install it 

	[~/examples/example-19]$ npm install passport-http-bearer

The lets create our verifier, there are two steps, ensuring the decoded information matches our user, this would be were we would usually retrieve our user, then once we have a user and its valid, we can check whether the token is valid based on the users secret.

	var BearerStrategy = require( 'passport-http-bearer' ).Strategy;
		
	var bearerStrategy = new BearerStrategy( 
		function( token, done ) {
			var payload = JSONWebToken.decode( token );
			var user = users[ payload.username ];
			// If we can't find a user, or the information 
			// doesn't match then return false
			if ( user == null ||
			     user.id !== payload.id || 
			     user.username !== payload.username ) {
				return done( null, false );
			}
			// Ensure the token is valid now we have a user
			JSONWebToken.verify( token, user.secret, function ( error, decoded ) {
				if ( error || decoded == null ) {
					return done( error, false );
				}
				return done( null, user );
			});
		}
	)

We can register this strategy as bearer so we can use it later

	Passport.use( 'bearer', bearerStrategy );

We can create a simple route where we retrieve user details for an authenticated user

	app.get( 
		'/userinfo',
		Passport.authenticate( 'bearer', { session: false } ),
		function ( request, response ) {
			var user = request.user;
			response.send( {
				id: user.id,
				username: user.username
			});
		} 
	);

Lets run our server

	[~/examples/example-19]$ node server.js
	Listening on port 8080

Once we recieve a token

	[~]$ curl -X POST http://localhost:8080/login \
			-H 'Content-Type: application/json' \
			-d '{"username":"foo","password":"bar"}'

We can use the result in our requests

	[~]$ curl -X GET http://localhost:8080/userinfo \
			-H 'Authorization: Bearer <token>'
	{"id":1,"username":"foo"}

This can be used with our requests to limit what each user can see and who is doing what, however we won't cover this in this chapter

----------

### Summary

Now we have everything we need to make some pretty cool services, we can now create a HTTP from scratch, route our requests, create a RESTful interface and authenticate users. 

This will significantly help you with creating complete Node.JS services. In the next chapter we will cover debugging our applications. 
# Chapter 3

At some point in your journey with node you it is inevitable that you will have to debug some nasty bugs, so lets expect them before hand and plan for when that day comes. 

There are a few methods that we can use to debug our software, the first one we are going to look at is logging. 

The most simple way to log a message is to use `console`, in most of the previous examples `console` has been used to portray what is going on without needing to see the entire HTTP request and response making things a lot more readable and simple. 

An example of this could be 

	var Http = require( 'http' );
	
	Http.createServer( function( request, response ) {
		console.log( 
			'Received request', 
			request.method,
			request.url 
		)
		
		console.log( 'Returning 200' );
		
		response.writeHead( 200, { 'Content-Type': 'text/plain' } );
		response.end( 'Hello World\n' );
  
	}).listen( 8000 );
	
	console.log( 'Server running on port 8000' ); 

Running this example will log requests and responses to the console

	[~/examples/example-6]$ node server.js                                         
	Server running on port 8000
	Received request GET /
	Returning 200
	Received request GET /favicon.ico
	Returning 200
	Received request GET /test
	Returning 200
	Received request GET /favicon.ico
	Returning 200

If we are using a framework that accepts middleware we could use a simple NPM package called morgan, you can find the package at https://www.npmjs.com/package/morgan

	[~/examples/example-7]$ npm install morgan
	[~/examples/example-7]$ npm install router
	
We can use it by using require to bring it into our code and add it as middleware

	var Morgan = require( 'morgan' ),
		Router = require( 'router' ),
		Http = require( 'http' );

	router = new Router( );
	
	router.use( Morgan( 'tiny' ) ); 

	/* Simple server */
	Http.createServer( function( request, response ) {
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
	}).listen( 8000 );
	
	console.log( 'Server running on port 8000' );
	
	function getInfo ( request, response ) {
		var info = process.versions;
	
		info = JSON.stringify( info );
		response.writeHead( 200, { 'Content-Type': 'application/json' } );
		response.end( info );
	}
	router.get( '/info', getInfo );

When running the server now we can see each request and response without having to add logging in each request

	[~/examples/example-7]$ node server.js                                         
	Server running on port 8000
	GET /test 404 - - 4.492 ms
	GET /favicon.ico 404 - - 2.281 ms
	GET /info 200 - - 1.120 ms
	GET /info 200 - - 1.120 ms
	GET /test 404 - - 0.199 ms
	GET /info 200 - - 0.494 ms
	GET /test 404 - - 0.162 ms
	
Having this kind of logging is a simple way to see what is being used on the server and how long each request is taking, as you can see here the first requests took the longest, then got a lot faster, even though it is only the difference between 3ms if the times were larger it could be a big problem. 

We could increase the information thats logged by changing the format we pass to morgan

	router.use( Morgan( 'combined' ) ); 

By running the server you will see more information such as the remote user, the date and time of the request, the amount of content that was returned and client they are using

	[~/examples/example-7]$ node server.js                                         
	Server running on port 8000
	::1 - - [07/Jun/2015:11:09:03 +0000] "GET /info HTTP/1.1" 200 - "-" "--REMOVED---"

Timing is definitely an important thing as it can be helpful when sifting though the mountains of logs that you will obtain, some bugs can be like a ticking time bomb waiting to explode at 3am on a Saturday night.

All these logs mean nothing to us if the process has died and the logs have disappeared. There is another popular and useful package called `bunyan` which wraps many logging methods into one. 

Bunyan brings to the table the use of writeable streams to write logs, whether this is a file on disk or `stdout`, aka `console`. This allows us to persist our logs for postmortem debugging. You can find more details about `bunyan` at https://www.npmjs.com/package/bunyan 

Lets install the package

	 [~/examples/example-8]$ npm install bunyan

Now lets do some logging

	var Bunyan = require( 'bunyan' ),
		logger;

	logger = Bunyan.createLogger( {
		name: 'example-8'
	});
	
	logger.info( 'Hello logging' ); 

Running our example 
		
	[~/examples/example-8]$ node index.js                                                                                                                                                                
	{"name":"example-8","hostname":"macbook.local","pid":2483,"level":30,"msg":"Hello logging","time":"2015-06-07T11:35:13.973Z","v":0}

This doesn't look very pretty though does it? Bunyan uses a simple structured JSON string to save messages, this makes it easy to parse, extend and read. Bunyan comes with a CLI helper to make everything nice and pretty

If we run the example with the CLI then we will see the output is nicely formatted

	[~/examples/example-8]$ node index.js | bunyan
	[2015-06-07T11:38:59.698Z]  INFO: example-8/2494 on macbook.local: Hello logging

If we add a few more levels you will see on your console that each is coloured differently to help identify them

	var Bunyan = require( 'bunyan' ),
		logger;

	logger = Bunyan.createLogger( {
		name: 'example-8'
	});
	logger.trace( 'Trace' );
	logger.debug( 'Debug' );
	logger.info( 'Info' );
	logger.warn( 'Warn' );
	logger.error( 'Error' );
	logger.fatal( 'Fatal' );
	
	logger.fatal( 'We got a fatal, lets exit' );
	process.exit( 1 );
	
Run the example

	[~/examples/example-8]$ node index.js | bunyan                                                                                                                                                      
	[2015-06-07T11:39:55.801Z]  INFO: example-8/2512 on macbook.local: Info
	[2015-06-07T11:39:55.811Z]  WARN: example-8/2512 on macbook.local: Warn
	[2015-06-07T11:39:55.814Z] ERROR: example-8/2512 on macbook.local: Error
	[2015-06-07T11:39:55.814Z] FATAL: example-8/2512 on macbook.local: Fatal
	[2015-06-07T11:39:55.814Z] FATAL: example-8/2512 on macbook.local: We got a fatal, lets exit

If you noticed trace and debug weren't outputted in the console, this is because they are most often used to follow flow of the program rather than key information and is usually very noisy

We can change the level of logs we want to see by passing this as an option when we create the logger

	logger = Bunyan.createLogger( {
		name: 'example-8',
		level: Bunyan.TRACE 
	});

Now when we run the example

	[~/examples/example-8]$ node index.js | bunyan                                                                                                                                                      
	[2015-06-07T11:55:40.175Z] TRACE: example-8/2621 on macbook.local: Trace
	[2015-06-07T11:55:40.177Z] DEBUG: example-8/2621 on macbook.local: Debug
	[2015-06-07T11:55:40.178Z]  INFO: example-8/2621 on macbook.local: Info
	[2015-06-07T11:55:40.178Z]  WARN: example-8/2621 on macbook.local: Warn
	[2015-06-07T11:55:40.178Z] ERROR: example-8/2621 on macbook.local: Error
	[2015-06-07T11:55:40.178Z] FATAL: example-8/2621 on macbook.local: Fatal
	[2015-06-07T11:55:40.178Z] FATAL: example-8/2621 on macbook.local: We got a fatal, lets exit

We usually don't want to see logs that are lower than the info level as any information that is useful for post-mortem debugging should have been logged using info or higher.

Bunyans api is good for logging errors and objects as well, it will save the correct structures in its JSON output ready for display

	try {
		ref.go( );
	} catch ( error ) {
		logger.error( error );
	}

Run the example

	[~/examples/example-9]$ node index.js | bunyan                                                                                                                                                      
	[2015-06-07T12:00:38.700Z] ERROR: example-9/2635 on macbook.local: ref is not defined
	    ReferenceError: ref is not defined
	        at Object.<anonymous> (~/examples/example-8/index.js:9:2)
	        at Module._compile (module.js:460:26)
	        at Object.Module._extensions..js (module.js:478:10)
	        at Module.load (module.js:355:32)
	        at Function.Module._load (module.js:310:12)
	        at Function.Module.runMain (module.js:501:10)
	        at startup (node.js:129:16)
	        at node.js:814:3

If we look at the example and pretty print it we will see that they save it as an error

	[~/examples/example-9]$ npm install -g prettyjson
	[~/examples/example-9]$ node index.js | prettyjson
	name:     example-9
	hostname: macbook.local
	pid:      2650
	level:    50
	err: 
	  message: ref is not defined
	  name:    ReferenceError
	  stack: 
	    """
	      ReferenceError: ref is not defined
	          at Object.<anonymous> (~/examples/example-8/index.js:9:2)
	          at Module._compile (module.js:460:26)
	          at Object.Module._extensions..js (module.js:478:10)
	          at Module.load (module.js:355:32)
	          at Function.Module._load (module.js:310:12)
	          at Function.Module.runMain (module.js:501:10)
	          at startup (node.js:129:16)
	          at node.js:814:3
	    """
	msg:      ref is not defined
	time:     2015-06-07T12:02:33.875Z
	v:        0

This is useful because if you were to just log an error you would either just get an empty object if you used `JSON.stringify`, or just the message if you used `toString`

	try {
		ref.go( );
	} catch ( error ) {
		console.log( JSON.stringify( error ) );
		console.log( error );
		console.log( {
			message: error.message
			name: error.name
			stack: error.stack
		});
	}
 
 Run the example
	
	[~/examples/example-10]$ node index.js                                                                                                                                                               
	{}
	[ReferenceError: ref is not defined]
	{ message: 'ref is not defined',
	  name: 'ReferenceError',
	  stack: '--REMOVED--' }
	
It is a lot simpler and cleaner to use `logger.error( error )` then `logger.error( { message: error.message /*, ... */ } );`

As mentioned earlier, bunyan uses the concept of streams, which means we can write to file, stdout, or any other service we wish to extend to. 

To write to a file all we need to do is add it to the options passed to bunyan at setup

	var Bunyan = require( 'bunyan' ),
		logger;

	logger = Bunyan.createLogger( {
		name: 'example-11',
		streams: [
			{
				level: Bunyan.INFO,
				path: './log.log'	
			}
		]
	});
	
	logger.info( process.versions );
	logger.info( 'Application started' );

By running the example you won't see any logs being outputted to console, but they will be written to file instead

	 [~/examples/example-11]$ node index.js
		 
If you list whats in the directory you will see a new file has been created

	[~/examples/example-11]$ ls                                                                                                                                                                          
	index.js     log.log      node_modules

If you read whats in the file you will see the logs have been written
	
	[~/examples/example-11]$ cat log.log                                                                                                                                                                 
	{"name":"example-11","hostname":"macbook.local","pid":3614,"level":30,"http_parser":"2.3","node":"0.12.2","v8":"3.28.73","uv":"1.4.2-node1","zlib":"1.2.8","modules":"14","openssl":"1.0.1m","msg":"","time":"2015-06-07T12:29:46.606Z","v":0}
	{"name":"example-11","hostname":"macbook.local","pid":3614,"level":30,"msg":"Application started","time":"2015-06-07T12:29:46.608Z","v":0}

We can run this through bunyan to print it out nicely

	[~/examples/example-11]$ cat log.log | bunyan
	[~/examples/example-11]$ cat log.log | bunyan                                                                                                                                                        
	[2015-06-07T12:29:46.606Z]  INFO: example-11/3614 on macbook.local:  (http_parser=2.3, node=0.12.2, v8=3.28.73, uv=1.4.2-node1, zlib=1.2.8, modules=14, openssl=1.0.1m)
	[2015-06-07T12:29:46.608Z]  INFO: example-11/3614 on macbook.local: Application started
	
Now that we can log to file we also want to be able to see the messages as they happen, if we were just logging to file we could use

	[~/examples/example-11]$ tail -f log.log | bunyan

This would log to stdout as the file is being written to, or we could add another stream to bunyan 

	logger = Bunyan.createLogger( {
		name: 'example-11',
		streams: [
			{
				level: Bunyan.INFO,
				path: './log.log'	
			},
			{
				level: Bunyan.INFO,
				stream: process.stdout
			}
		]
	});

Running the example will display the logs to console

	[~/examples/example-11]$ node index.js | bunyan                                                                                                                                                      
[2015-06-07T12:37:19.857Z]  INFO: example-11/3695 on macbook.local:  (http_parser=2.3, node=0.12.2, v8=3.28.73, uv=1.4.2-node1, zlib=1.2.8, modules=14, openssl=1.0.1m)
[2015-06-07T12:37:19.860Z]  INFO: example-11/3695 on macbook.local: Application started

We can also see the logs have been appended to the file 

	[~/examples/example-11]$ cat log.log | bunyan                                                                                                                                                        
	[2015-06-07T12:29:46.606Z]  INFO: example-11/3614 on macbook.local:  (http_parser=2.3, node=0.12.2, v8=3.28.73, uv=1.4.2-node1, zlib=1.2.8, modules=14, openssl=1.0.1m)
	[2015-06-07T12:29:46.608Z]  INFO: example-11/3614 on macbook.local: Application started
	[2015-06-07T12:37:19.857Z]  INFO: example-11/3695 on macbook.local:  (http_parser=2.3, node=0.12.2, v8=3.28.73, uv=1.4.2-node1, zlib=1.2.8, modules=14, openssl=1.0.1m)
	[2015-06-07T12:37:19.860Z]  INFO: example-11/3695 on macbook.local: Application started

Great, now we have logging down, what shall we do with it?
	
Well, it would help if we knew where our errors are happening, and it starts to get really messy when you have lots of anonymous functions around the place, if you noticed in the examples in chapter 2, the majority of the functions were named, this is very helpful for tracking down errors when callbacks are involved. 

Lets look at this example

	try {
		a = function( callback ) {
			return function( ) {
				callback( );
			};
		};
		b = function( callback ) {
			return function( ) {
				callback( );
			}
		};
		c = function( callback ) {
			return function( ) {
				throw new Error( "I'm just messing with you" ); 
			};
		};
		a( b( c( ) ) )( );
	} catch ( error ) {
		logger.error( error );
	}

It might look a bit messy, and thats because it is. Lets run the example
	
	[~/examples/example-12]$ node index.js | bunyan                                                                                                                                                      
	[2015-06-07T12:51:11.665Z] ERROR: example-12/4158 on macbook.local: I'm just messing with you
	    Error: I'm just messing with you
	        at /Users/fabian/examples/example-12/index.js:19:10
	        at /Users/fabian/examples/example-12/index.js:14:4
	        at /Users/fabian/examples/example-12/index.js:9:4
	        at Object.<anonymous> (/Users/fabian/examples/example-12/index.js:22:16)
	        at Module._compile (module.js:460:26)
	        at Object.Module._extensions..js (module.js:478:10)
	        at Module.load (module.js:355:32)
	        at Function.Module._load (module.js:310:12)
	        at Function.Module.runMain (module.js:501:10)
	        at startup (node.js:129:16)

You can see that there are no function names in our code, and no naming in the stack trace, unlike the first few functions in the trace. In node the naming of functions will come from either the variable name or the actual function name, for example if you use `Cls.prototype.func` then the name will be `Cls.func`, if you use `function func` then the name will be `func`

You can see there is a slight benefit here, but once you start using patterns involving async callbacks this becomes very useful

	[~/examples/example-13]$ npm install q

Lets throw an error in a callback

	var Q = require( 'q' );
	
	Q( )
	.then( function() {
		// Promised returned from another function
		return Q( )
		.then( function( ) {
			throw new Error( 'Hello errors' ); 
		});
	})
	.fail( function( error ) {
		logger.error( error );
	});

Running our example gives us 

	[~/examples/example-13]$ node index.js | bunyan                                                                                                                                                      
	[2015-06-07T13:03:57.047Z] ERROR: example-13/4598 on macbook.local: Hello errors
	    Error: Hello errors
	        at /Users/fabian/examples/example-13/index.js:12:9
	        at _fulfilled (/Users/fabian/examples/example-13/node_modules/q/q.js:834:54)
	        
This is where it starts to get difficult to read, giving our functions simple names can help us find where the error is coming from 

	return Q( )
		.then( function resultFromOtherFunction( ) {
			throw new Error( 'Hello errors' ); 
		});
	
Running the example

	[~/examples/example-13]$ node index.js | bunyan                                                                                                                                                      
	[2015-06-07T13:04:45.598Z] ERROR: example-13/4614 on macbook.local: Hello errors
	    Error: Hello errors
	        at resultFromOtherFunction (/Users/fabian/examples/example-13/index.js:12:9)
	        at _fulfilled (/Users/fabian/examples/example-13/node_modules/q/q.js:834:54)

#### Error handling

Another aspect of debugging is handling and expecting errors beforehand, there are three ways we can handle our errors, a simple try/catch, catching them at the process level, or catching errors on the domain level

A try/catch would be sufficient if we were expecting an error to occur and we are able to continue without the result of what ever was being executed, or we could handle and return the error 

	function parseJSONAndUse( input ) {
		var json = null;
		try {
			json = JSON.parse( input );
		} catch ( error ) {
			return Q.reject( new Error( "Couldn't parse JSON" ) );
		}
		return Q( use( json ) );
	}

The next simplest way to catch errors is to add an error handler to your process, any errors that are caught at this level are usually fatal and should be treated as such, an exit of the process should follow, you should be using a package such as `forever` or `pm2`
	
	process.on( 'uncaughtException', function errorProcessHandler( error ) {
		logger.fatal( error );
		logger.fatal( 'Fatal error encountered, exiting now' );
		process.exit( 1 );
	});

You should always exit the process following an uncaught error, if it is uncaught that means that your application is in an unknown state where anything could happen, for example there could have been an error in your HTTP router and no more requests can be routed to the correct handlers, you can read more about this at https://nodejs.org/api/process.html#process_event_uncaughtexception
	
A better way to handle errors on a global level is domains. With domains you can almost *sandbox* a group of asynchronous code together.

Lets think in the context of a request to our server. We make a request, read from a database, make calls to external services, write back to a database, do some logging, do some business logic, and all around the code we expect perfect data coming from external sources, however in the real world that ins't always so and we can't handle every error that could possibly happen, but we don't want to take down our entire server just because of one error for a very specific request. Thats where we need domains. 

Lets look at the example 

	var Domain = require( 'domain' ),
		domain;
	
	domain = Domain.create( );
	
	domain.on( 'error', function( error ) {
		console.log( 'Domain error', error.message );
	});
	
	domain.run( function( ) {
		// Run code inside domain
		console.log( process.domain === domain );
		throw new Error( 'Error happened' ); 
	});
	
Lets run the code
		
	[~/examples/example-14]$ node index.js                                                                                                                                                               
	true
	Domain error Error happened

There is a problem with this code however, because we are running this synchronously we are still putting the process into a broken state, this is because the error bubbled up to node itself and then was passed to the active domain. 

When we are creating the domain in an asynchronous callback we can be *sure* that the process can continue, we can mimmic this by using `process.nextTick`

	process.nextTick( function( ) {
		domain.run( function( ) {
			throw new Error( 'Error happened' );
		});
		console.log( "I won't execute" );
	}); 
	
	process.nextTick( function( ) {
		console.log( 'Next tick happend!' );
	});
	
	console.log( 'I happened before everything else' );

Running the example should display the correct logs 

	[~/examples/example-15]$ node index.js                                                                                                                                                               
	I happened before everything else
	Domain error Error happened
	Next tick happend!


----------

### Summary

In this chapter we have covered a few postmortem debugging methods to help us uncover bugs, we also covered error handling including using domains. 

In the next chapter we will cover configuration of our applications
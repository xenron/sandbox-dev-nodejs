## Chapter 5

In this chapter we will be covering two variations of databases that can be used with NodeJS, one providing very lightweight and simple set of features, while another giving us more flexibility and a general purpose set of features

----------

### Level DB

One great things with Node.JS is that we are using the same language for both front and back end, the same goes for NoSQL databases, the majority of them support JSON right of the mark, this is great for anyone using Node.JS as there is no time spent taking a relational model, turning it into a JSON like structure, then passing it to the browser, doing something with it and reversing the process.

With the database supporting JSON *natively* you can get right down to business and play ball. 

Google have provided us with a simple hook into a NoSQL database that can be installed and ready to use using just one command 

	[~/examples/example-18]$ npm install level

You will see this will install both LevelDOWN and LevelUP

LevelDOWN is the low level bindings to LevelDB, LevelUP is the simple wrapper around this.

LevelDB is very simple in terms of setup, once installed we just create an instance of LevelUP and pass it where we want our database to be stored

	var LevelUP = require( 'level' ),
		db = new LevelUP( './example-db');

Now we have a fast and simple way to store data

As LevelDB is just a simple key/value store it defaults to string keys and string values. This is useful if thats all the information you wish to store. It has a very simple API, at this stage we are only going to focus on 4 methods `put`, `get`, `del` and `createReadStream` its pretty obvious what most do

| Method | Used for            | Arguments      	               |
|--------|---------------------|-------------------------------|
| put    | inserting pairs     |	 key, value, callback( error ) |
| get    | fetching pairs      | key, callback( error, value ) |
| del    | deleting pairs  	   | key, callback( error )		   |
| get    | fetching many pairs |         				       |

To insert data, once we have created our database, all we need to do is 

	db.put( 'key', 'value', function( error ) {
		if ( error ) return console.log( 'Error!', error )
	
		db.get( 'key', function( error, value ) {
			if ( error ) return console.log( 'Error!', error )

			console.log( "key =", value )
		});
	});

If we run the code we will see that we inserted and retrieved our value

	[~/examples/example-18]$ node index.js
	key = value

This isn't our simple JSON structure however, its just a string. To get our store to save JSON all we need to do is to pass the value encoding as an option to the database

	var LevelUP = require( 'level' ),
		db = new LevelUP( './example-db', {
			valueEncoding: 'json'
		});

Now we can store JSON data

	db.put( 'jsonKey', { inner: 'value' }, function ( error ) {
		if ( error ) return console.log( 'Error!', error )
	
		db.get( 'jsonKey', function( error, value ) {
			if ( error ) return console.log( 'Error!', error )
	
			console.log( "jsonKey =", value )
		});
	});

Because a string can be stored as JSON we can still pass strings as a value, and retrieve it as such

Running this example will show this 

	[~/examples/example-18]$ node index.js
	key = value
	jsonKey = { inner: 'value' }

Now we have the simple methods down we can move along to `createReadStream`

This function returns an object can be compared to nodes built in `ReadableStream`, for each key/value pair in our database it will emit a `data` event, it also emits other events such as `error` and `end`. If `error` doesn't have an event listener then it will propagate, killing your entire process ( or domain ).

	db.put( 'key1', { inner: 'value' }, function( error ) {
		if ( error ) return console.log( 'Error!', error )
		
		var stream = db.createReadStream( );
		
		stream
		.on( 'data', function( pair ) {
			console.log( pair.key, "=", pair.value );
		})
		.on( 'error', function( error ) {
			console.log( error );
		})
		.on( 'end', function( ) {
			console.log( 'end' );
		});
	});

Running this example

	
	[~/examples/example-20]$ node index.js
	key1 = { inner: 'value' }
	end

If we put more data in the database we will have multiple `data` events emitted

	[~/examples/example-20]$ node index.js
	key1 = { inner: 'value' }
	key2 = { inner: 'value' }
	end

----------

### MongoDB

As you can see databases with Node can be **very** simple. If we wanted something a bit more complete we could use another NoSQL database called *MongoDB*. 

For this set of examples you can either use a hosted database using a provider like MongoLab, they provide a free tier for development, or you can set up a database locally following these instructions 
http://docs.mongodb.org/manual/installation

Once you have a database to connect to, we can continue

Mongo has several modules that can be used with Node, the most popular one is Mongoose, however we will be using the core MongoDB module

	[~/examples/example-21]$ npm install mongodb

For us to use our database we first need to connect to it.

We need to provide the client with a connection string, it is a generic URI with the protocol of `mongodb`

If you have a local mongo database running with no credentials you would use

	mongodb://localhost:27017/database

The default port is `27017` so you don't need to specify that, however it is included for completeness 

If you are using MongoLab then they will provide you with a connection string, however it should be in the format of 

	mongodb://<dbuser>:<dbpassword>@<ds>.mongolab.com:<port>/<db>

Connecting to our database is actually pretty simple, all we need to do is provide the driver with a connection string and we get back a database

	var MongoDB = require('mongodb'),
		MongoClient = MongoDB.MongoClient;

	connection = "mongodb://localhost:27017/database"
	
	MongoClient.connect( connection, function( error, db ) {
	    if( error ) return console.log( error );
	
		console.log( 'We have a connection!' );
	});

Each set of data in mongo are stored in a collection, once we have a database we can fetch a collection to run operations on

	var collection = db.collection( 'collection_name' ); 

With a collection we have a few simple methods that hold lots of power, giving us a full CRUD "API"

Each document in mongo has an id, which is an instance of `ObjectId`, the property they use for this id is `_id`

To save a document we just need to call `save`, it accepts an object, or an array of objects. A single object in a collection is referred to as a document 

	var doc = { 
		key: 'value_1'	
	};
	collection.save( doc, { w: 1 }, function( ) {
		console.log( 'Document saved' )
	});

If we call `save` with a document that has an ID then the document will be updated rather than inserted

	var ObjectId = MongoDB.ObjectId 
	// This document already exists in my database
	var doc_id = {
		_id: new ObjectId( "55b4b1ffa31f48c6fa33a62a" ),
		key: 'value_2'
	};
	collection.save( doc_id, { w: 1 }, function( ) {
		console.log( 'Document with ID saved' );
	});

Now that we have documents in our database we can query for them

	collection.find( ).toArray( function( error, result ) {
		console.log( result.length + " documents in our database!" )
	});

If no callback was provided to `find` then it will return a cursor, this allows us to use methods like `limit`, `sort` and `toArray`.

You can pass a query to `find` to limit what is returned, to find an object by its ID we need to use something like

	collection.find( 
		{ _id: new ObjectId( "55b4b1ffa31f48c6fa33a62a" ) },
		function( error, documents ) {
			console.log( 'Found document', documents[ 0 ] );
		}
	);

We can also filter by any other property you might use

	collection.find(
		{ key: 'value' },
		function( error, documents ) {
			console.log( 'Found', documents.length, 'documents' );	
		}
	);

If you have used SQL before you would have noticed the lack of operators like `OR`, `AND` or `NOT`, but don't worry because mongo provides many equivalents.

You can see a complete list here http://docs.mongodb.org/manual/reference/operator/query/

All operators are prefixed with the dollar sign, for example `$and`, `$or`, `$gt` and `$lt`

You can see the specific syntax for using these by looking at the documentation

To use an `$or` condition you include it as if it was a property 

	collection.find(
		{ 
			$or: [
				{ key: 'value' },
				{ key: 'value_2' }
			]
		},
		function( error, documents ) {
			console.log( 'Found', documents.length, 'documents' );	
		}
	);
	
Using a database like MongoDb gives us more power to retrieve our data and create more feature full software

----------

### Summary

Now we have places we can store our data, on one end we have a simple key/value store which provides us a super convenient way to store data, and on the other end we have a feature full database that provides us with a full set of query operators.

Both these databases will help us in the next chapters as we move closer to creating our full stack application 

 




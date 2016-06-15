### Chapter 8

We have come this far now, but haven't done any testing! That's not very good is it? Usually, if not always, testing is a main concern around software. In this chapter we will be covering unit testing concepts with Node

There are many testing frameworks for node, in this chapter we will be covering is Mocha

To ensure mocha is installed everywhere we want to install it globally, this can be done using the `-g` flag with `npm install`

	[~/examples/example-24]$ npm install -g mocha

Now we can use Mocha through the terminal

Typically we would contain all our testing code in a `test` sub-diriectory within your project, all we need to do to get our code running is run `mocha`, assuming we have written some tests first

As with many ( if not all? ) unit testing frameworks, Mocha uses assertions to ensure a test ran correctly, if an error is thrown, and not handled, then the test failed. What assertion libraries do is throw errors when an unexpected value was passed, so this works well.

Node provides a simple assertion module, lets have a look.

	[~/examples/example-24]$ node
	> assert = require( 'assert' )
	> expected = 1
	> actual = 1
	> assert.equal( actual, expected )
	> actual = 1
	> assert.equal( actual, expected )
	AssertionError: 2 == 1

As we can see an error is thrown if the assertion didn't pass, but the error message provided wasn't very handy, to fix this we can pass an error message as well

	> assert.equal( actual, expected, 'Expected 1' )
	AssertionError: Expected 1

With this we can create a test

Mocha provides many ways of creating tests, these are called *interfaces*, the default is called BDD

You can view all interfaces here http://mochajs.org/#interfaces 

The BDD ( business driven development ) interface can be compared to Gherkin where we specify a feature, and a set of scenarios. It provides methods to help define these sets, `describe` or `context` is used to define a feature, and `it` or `specify` are used to define a scenario

For example, if we were to have a function that returns someone's first **and** last name, the tests might look something like

	var GetFullName = require( '../lib/get-full-name' ),
		assert = require( 'assert' );
	 
	describe( 'Fetch full name', function( ) {

		it( 'should return both a first and last name', function( ) {
			var result = GetFullName( { first: 'Node', last: 'JS' } )
			assert.equal( result, 'Node JS' );
		})
	})

We could also add a few more tests for this, for example, if it threw an error if no object was passed 

	it( 'should throw an error when an object was not passed', function( ) {
		assert.throws(
			function( ) {
				GetFullName( null );
			},
			/Object expected/
		)
	})

You can explore many more Mocha specific features at http://mochajs.org/

### Chai

Along with the many testing frameworks, there are also many assertion frameworks, one of which is called chai, full documentation can be found at http://chaijs.com/

Instead of just using the build in assertion module provided by Node we may want to use a module like chai to extend possibilities.

Chai has three sets of interfaces, should, expect and assert. In this chapter we will be covering expect. 

When using expect, you are using closer to real language to describe what you want, for example, if you wanted something to exist, you could say, `expect x to exists` rather than `assert !!x` 

	var Expect = require( 'chai' ).expect
	var Assert = require( 'assert' )
	
	var value = 1
	
	Expect( value ).to.exist 
	assert( !!value )

Using natural language makes things a lot cleaner for people reading your tests

This language can be linked together, we have  `to`, `be`, `been`, `is`, `that`, `which`, `and`, `has`, `have`, `with`, `at`, `of` and `same`, then can help us to build sentences like

	Expect( value ).to.be.ok.and.to.equal( 1 )

These words are only for reliability however and don't modify the result, there are however lots of words that can be used to assert things, for example `not`, `exists`, `ok`, and many more, you can view them all here http://chaijs.com/api/bdd/

Some examples of these in use are

	Expect( true ).to.be.ok
	Expect( false ).to.not.be.ok
	Expect( 1 ).to.exists 
	Expect( [ ] ).to.be.empty
	Expect( 'hi' ).to.equal( 'hi' )
	Expect( 4 ).to.be.below( 5 ) 
	Expect( 5 ).to.be.above( 4 )
	Expect( function() {} ).to.be.instanceOf( Function )
	
### Stubbing methods

###### *If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.*

As you write your tests you want to be only be testing *units* of code, generally this will be a method, provide it some input, and expect an output of some kind, or if it is a *void* function, expect nothing to happen. 

With this in mind you have to think of your application as being in a sandboxed state where it can't talk to the outside world, for example, it might not be able to talk to a database, or make any kind of external request.
Having this assumption is great if you are going to ( and you usually should ) implement continuous integration and deployment. It also means that there are no external requirements for the machine you are testing on except for Node and the testing framework, which could just be part of your package anyway

Unless the method you are testing is rather simple and doesn't have any external dependencies, you probably will want to *mock* methods that you know it is going to execute. A great module to do this is called SinonJS, it allows you to create *stubs* and *spys* to assert correct data is returned from other methods, and to ensure that they were called in the first place

Sinon provides many helpers, as mentioned before, one of these is called a *spy*. A spy is used mainly to just wrap a function to see what its input and output was. Once a spy has been applied to a function, to the outside world it behaves exactly the same.

	var Sinon = require( 'sinon' );
	
	var returnOriginal = function( value ) {
		return value;
	}
	
	var spy = Sinon.spy( returnOriginal );
	
	result = spy( 1 );
	console.log( result ); // Logs 1

We can also use a spy to check if a function was called

	assert( spy.called ) 

Or what arguments were passed for each call

	assert.equal( spy.args[ 0 ][ 0 ], 1 )

If we provided `spy` with an object, and a method to replace then we could restore the original once we are finished, we would usually do this in the *tear down* of our test

	var object = {
		spyOnMe: function( value ) {
			return value;
		}
	}
	Sinon.spy( object, 'spyOnMe' )
	
	var result = object.spyOnMe( 1 )
	assert( result.called )
	assert.equal( result.args[ 0 ][ 0 ], 1 )
	
	object.spyOnMe.restore( )

We also have a `stub` function, which inherits all the functionalty of `spy`, but instead of calling the original function, it completely replaces it. 

This is because we can define the behaviour. For example, what it returns

	var stub = Sinon.stub( ).returns( 42 ) 
	console.log( stub( ) ) // logs 42

We can also define a return value for a set of arguments passed 

	var stub = Sinon.stub( )
	stub.withArgs( 1, 2, 3 ).returns( 42 )
	stub.withArgs( 3, 4, 5 ).returns( 43 )
	
	console.log( stub( 1, 2, 3 ) ) // logs 42
	console.log( stub( 3, 4, 5 ) ) // logs 43

Lets say we had this set of methods

	function Users( ) {
	
	}
	Users.prototype.getUser = function( id ) {
		return Database.findUser( id );
	}
	Users.prototype.getNameForUser = function( id ) {
		var user = this.getUser( id );
        return user.name;
	}
	module.exports = Users

Now we only care about the scenario where a user is returned, as the `getUser` function will throw an error if it can't find it, knowing this we just want to test that *when a user is found, return their name*

This is a perfect example on when we want to *stub* a method

	var Sinon = require( 'sinon' );
	var Users = require( '../lib/users' ); 
	var Assert = require( 'assert' ); 

	it( 'should return a users name', function( ) {
		
		var name = 'NodeJS';
		var user = { name: name };
		
		var stub = Sinon.stub( ).returns( user );
		
		var users = new Users( );
		users.getUser = stub;
		
		var result = users.getNameForUser( 1 );
		
		assert.equal( result, name, 'Name not returned' );
	});

Instead of replacing the function we could also pass the function using the scope, replacing `this` with the object we passed, either way is sufficient. 

	var result = users.getNameForUser.call( 
		{
			getUser: stub 
		},
		1
	);


### Summary

Everything we need to create NodeJS applications is now at our fingertips. Testing is just one of those things that is essential to any successful software. 

In the next chapter we will be putting all our skills together and create a full stack application. 
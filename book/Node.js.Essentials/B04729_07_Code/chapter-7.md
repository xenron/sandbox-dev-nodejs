### Chapter 7 

Now that we have all of the pieces needed to create our NodeJS applications and servers, we now need to focus more on sharing our modules and contributing to the eco-system. 

All the packages on NPM have been uploaded, maintained and contributed by someone in the community, so lets look into how we can do this ourselves.

First we need to create a user

	[~]$ npm adduser                                                               
	Username: <username>
	Password: 
	Email: (this IS public) <email>

Once we have a user we have opened the gates to NPM

Lets create a package

	[~/examples/example-22]$ npm init 
	{
	  "name": "njs-e-example-package",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "",
	  "license": "ISC"
	}

To publish this package all we need to do is run 

	[~/examples/example-22]$ npm publish
	+ njs-e-example-package@1.0.0

You can see that we have published our package, you can view the one I published at 

	https://www.npmjs.com/package/njs-e-example-package

You will need to name your package something else to publish it, otherwise we will conflict 

Now I can run

	[~/examples/example-21]$ npm install njs-e-example-package 
	njs-e-example-package@1.0.0 node_modules/njs-e-example-package
	 
And I will have my package! Isn't that pretty cool

When we go to publish again we will get an error because version `1.0.0` is already published

	[~/examples/example-22]$ npm publish
	npm ERR! publish Failed PUT 403
	npm ERR! "You cannot publish over the previously published version 1.0.0." : njs-e-example-package

To increment our package version all we need to do is call

	[~/examples/example-22]$ npm version patch
	v1.0.1

Now we can publish again

	[~/examples/example-22]$ npm publish
	+ njs-e-example-package@1.0.1

You can go to your packages page on NPM you will see that the version number and release count has updated

We can increment the version by `major`, `minor` and `patch` 

Sometimes there are things in your project that you don't want pushed out for other people to have, this could be original source, some certificates, or maybe some keys for development. Just like when using *git*, we have an ignore file `.npmignore`. 

By default if there is no `.npmignore` but there is a `.gitignore`, then npm will ignore what is matched by the `.gitignore` file. If you don't like this behavour then you can just create an empty `.npmignore` file. 

The `.npmignore` file follows the same rules as `.gitignore`

- Blank lines or lines starting with `#` are ignored.
- Standard glob patterns work.
- You can end patterns with a forward slash `/` to specify a directory.
- You can negate a pattern by starting it with an exclamation point `!`.

Say we had a directory of certificates which we had a key in 

	
	[~/examples/example-22]$ mkdir certificates
	[~/examples/example-22]$ touch certifticates/key.key

We probably don't want this published, so in our ignore file we have

	certificates/

We also probably don't want any key files that we have laying around so we add this as well

	*.key

Now lets publish 

	[~/examples/example-22]$ npm version patch
	v1.0.2
	[~/examples/example-22]$ npm publish 
	+ njs-e-example-package@1.0.2

Now lets install our package

	[~/examples/example-23]$ npm install njs-e-example-package@1.0.2

Now when we list whats in the directory, we don't see all our certificates being passed around

	[~/examples/example-23]$ ls node_modules/njs-e-example-package
	package.json

This is great, but what if we want to protect our entire package? Not just some certificates?

All we need to do is set `private` to `true` in our `package.json` file, and it will prevent NPM from publishing the module when we run `npm publish` 

Our `package.json` should look something like

	{
	  "name": "example-23",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "",
	  "license": "UNLICENSED",
	  "dependencies": {
	    "njs-e-example-package": "^1.0.2"
	  },
	  "private": true
	}

Now when we run `npm publish`

	[~/examples/example-23]$ npm publish 
	npm ERR! This package has been marked as private

Awesome, thats exactly what we wanted to see. 

----------

### Summary

Looks like we are getting closer to being ready to go with all things NodeJS, we know now how to setup, debug, develop and distribute our software. 

In the next chapter we will cover one more concept we need to know about, Unit testing, once we have covered that we will be diving deep into creating a full stack application.


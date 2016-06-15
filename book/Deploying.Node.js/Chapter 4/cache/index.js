var redis	= require('redis');
var util 	= require('util');
var Promise = require('bluebird');

var Cache = function(config) {

	config = config || {};

	this.prefix = config.prefix ? config.prefix + ':' : 'cache:';

	var port = config.port || 6379;
	var host = config.host || 'localhost';

	this.client = redis.createClient(port, host, config.options || {});
	
	config.auth && this.client.auth(config.auth);
};

Cache.prototype.get = function(key) {
	
	key = this.prefix + key;
	
	var client = this.client;
	
	return new Promise(function(resolve, reject) {
		client.hgetall(key, function(err, result) {
			err ? reject() : resolve(result);
		});
	});
};

// Expect an object as value
//
Cache.prototype.set = function(key, val, ttl) {

	var _this = this;

	var pkey = this.prefix + key;
	
	var client = this.client;
	var setArr = [];
	
	for(var k in val) {
		setArr[k] = val[k];
	}
	
	return new Promise(function(resolve, reject) {
		client.hmset(pkey, setArr, function(err) {
			err ? reject() : resolve();
			ttl && _this.expire(key, ttl);
		});
	});
};

//	Wipes all keys with prefix of this Cache
//
Cache.prototype.clear = function() {
	var prefixMatch = this.prefix + '*';
	var client 		= this.client;
	return new Promise(function(resolve, reject) {
		var multi = client.multi();
		(function scanner(cursor) {
			client.scan([+cursor, 'match', prefixMatch], function(err, scn) {
				if(err) {
					return reject();
				}
				// Add new delete candidates
				multi.del(scn[1]);
				// More? Continue scan.
				if(+scn[0] !== 0) {
					return scanner(scn[0]);
				}
				// Delete candidates, then resolve.
				multi.exec(resolve);
			})
		})(0);
	});
};

// Deletes a specific key
//
Cache.prototype.remove = function(keys) {

	// Convert to an array
	//
	keys = util.isArray(keys) ? keys : [keys];
	
	var prefix = this.prefix;

	//	Prefix all keys to be deleted
	//
	keys = keys.map(function(key) {
		return prefix + key;
	});
	
	var client = this.client;
	
	return new Promise(function(resolve, reject) {
		client.del(keys, function(err, numrem) {
			err ? reject() : resolve(numrem);
		});
	});
};

Cache.prototype.expire = function(key, ttl) {

	ttl = ttl ? +ttl : 0;
	key = this.prefix + key;
	
	var client = this.client;
	
	return new Promise(function(resolve, reject) {	
		client.expire(key, ttl, function(err, ok) {
			err || !ok ? reject() : resolve(ok);
		});
	});
};

Cache.prototype.close = function() {
	this.client.quit();
};

module.exports = Cache;
/*
var events = require('events');

function getEmitter() {
	var emitter = new events.EventEmitter();
	emitter.emit("start");
	return emitter;
}

var myEmitter = getEmitter();

// This will never execute; #getEmitter fired ‘start’ 
// event prior to returning
myEmitter.on("start", function() {
	console.log("Started");
})
*/
var EventEmitter = require('events').EventEmitter;

var Counter = function(init) {
	this.increment = function() {
	    init++;
	    this.emit('incremented', init);
	}
}

Counter.prototype = new EventEmitter();

var counter = new Counter(10);

counter.addListener('incremented', function(count) {
    console.log(count);
});

counter.increment();
counter.increment();



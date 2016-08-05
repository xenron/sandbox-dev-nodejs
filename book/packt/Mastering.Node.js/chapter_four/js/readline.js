var fs = require('fs');
var readline = require('readline');
/*
var rl = readline.createInterface({
  input: fs.createReadStream("dictionary.txt"),
  terminal: false
});

rl.on("line", function(str) {
	console.log(str);
});
*/
// aardvark
// abacus
// abaisance
// ...

var rl = readline.createInterface({
  input: fs.createReadStream("dictionary.txt"),
  terminal: false
});

rl.pause()

rl.on("line", function(str) {
	console.log(str);
	setTimeout(function() { console.log("WHA?") }, 1000);
});

rl.on("pause", function() {
	console.log("pause");
});
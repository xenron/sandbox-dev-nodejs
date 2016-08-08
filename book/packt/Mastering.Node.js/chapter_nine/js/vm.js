var vm = require('vm');
/*
var util = require('util'),
    vm = require('vm'),
    sandbox = {
      animal: 'cat',
      count: 2
    };

vm.runInNewContext('var foo=this.__proto__;count += 1; name = "kitty"', sandbox, 'myfile.vm');
console.log(util.inspect(sandbox.foo));

var util = require('util'),
    vm = require('vm'),
    initSandbox = {
      animal: 'cat',
      count: 2
    },
    context = vm.createContext(initSandbox);

vm.runInContext('var foo=this.__proto__;count += 1; name = "CATT"', context, 'myfile.vm');
console.log(util.inspect(context.foo));

var localVar = 123,
    usingscript, evaled,
    vm = require('vm');
*/

var localVar = 123;

var tc = vm.runInThisContext('localVar = 321;');
console.log(localVar, tc);

var ev = eval('localVar = 321;');
console.log(localVar, ev);
//	123 321
//	321 321

x = 0;
y = 0;

var script = vm.createScript('++x, ++y;');
var emulation = vm.createContext({ x:0, y:0 });

for(var i=0; i < 1000; i++) {
	script.runInThisContext();
	script.runInNewContext();
}

console.log(x, y);
console.log(emulation.x, emulation.y);
// 	1000	1000	1000
// 	1000	1000	1000


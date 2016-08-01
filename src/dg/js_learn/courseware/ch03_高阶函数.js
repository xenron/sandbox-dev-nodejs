/*
 上节课讲到了apply和call方法
 这节课来了解下它们有什么用途
 
 
*/
//改变this指向，这是call和apply最常用的用途

var obj1 ={
	name : 'Jack'
};
var obj2 = {
	name :'Jenny'
};
window.name = 'window';
var getName = function(){
	alert(this.name);
};
getName();//函数调用方式，this指向了window对象
getName.apply(obj1);//改变了this指向，此时相当于alert(obj1.name);
getName.apply(obj2);//改变了this指向，此时相当于alert(obj2.name);

//上节课作业第二题，主要也是考察，这两个方法的应用
document.getElementById = (function(func){
	return function(){
		return func.apply(document,arguments);
	}
})(document.getElementById);   

var getId = document.getElementById; //返回 这个对象 function(){return func.apply(document,arguments);}
var div = getId('ntp-contents');//返回func.apply(document,arguments)的对象，arguments参数值div1,func执行闭包中的document.getElementById函数
alert(div.id);

//也可以这么做
var  getId = function(id){
	return document.getElementById(id);
};


//我们上节课讲到，怎么在一个内部函数中保持外层的this上下使用了一个变量that来保存外,还可以使用以下方法
Function.prototype.bind =function(context){
	var self = this ;
	return function(){
		alert(self);
		alert(context);
		return self.apply(context,arguments);
	}
};

var obj ={name : 'steven'};
var func = (function(){
	alert(this.name)
}).bind(obj);
/*
function(){
		return self.apply(context,arguments);
	}
*/
func();

//所以上节课中，以下方法可以改写成
var myobject = {
	num:0,
	increment:function(inc){
		this.num += typeof inc ==='number'?inc:1;
	},
	getNum :function(){
		return  this.num;
	}
};
myobject.printNum = function() {
	this.increment();
	var  print = function (){
		console.log(this.num);
	};
	print();
};
//改写如下
myobject.printNum = function() {
	this.increment();
	var  print =(function (){
		console.log(this.num);
	}).bind(this);
	print();
};

//通过Function.prototype.bind来包装print函数，并传入一个context当作参数，这个context对象正式我们想修正的this对象

//apply和call的另一个用途是借用其他对象的方法,上节课的作业就要求借助Array对象的方法来处理arguments

//排序
var sort = function(){
		var arr = Array.prototype.sort.call(arguments,function(a,b){return a-b;});
		for(var i = 0;i<arr.length;i++){
			console.log(arr[i]);
		}
};
sort(2,3,1,23);
//截取

var slice = function(start,end){
	    return function(){
			var arr = Array.prototype.slice.call(arguments,start,end);
			return arr ;
		};
};
(slice(2,3))(1,2,3,4,2,3);

/*

  什么是高阶函数？指的是满足下列条件之一的函数
  1. 函数可以作为参数传递
  2. 函数可以作为返回值输出
  
*/
https://github.com/v8/v8
/*
 上节课讲了Javascript中的函数，提及函数是对象，如此，它可以出现在任意表达式可以出现的地方
 所以javascript中的函数显然满足高阶函数的条件，而作为高阶函数，它有很多应用场景。
 
*/

/*函数作为参数传递*/

/*
函数作为参数传递，意味者可以抽离一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中
这样可以分离业务代码中变化和不变的部分
*/

/*
回调函数

函数作为参数传递，使得对不连续事件的处理变得更容易。

如果了解ajax的话，知道回调函数的使用是非常频繁的。

我们比较熟悉的场景是，我们在页面上提交了一个请求，直到服务器响应请求返回后才能进行下一步动作。
这就是所谓的同步请求，如果网络传输很慢或者服务器很慢，会把我们的耐心消磨掉

更好的的体验是，我们发起异步的请求，提高一个当服务器响应到达时随机触发的回调函数。
这样异步请求函数立即返回，我们可以继续做其它事情，而不必傻傻等待

ajax就是用来实现异步请求的一种机制

*/
var getUserName = function(userId,callback){
	
	$.ajax('http://xxx.com/getUserName?'+userId,function(data){
		if(typeof callback ==='function'){
			callback(data);
		}
	})
};
getUserName(1222,function(data){
	alert(data.userName);
});

/*
回调函数的应用不仅仅在异步请求中，当一个函数不适合执行一些请求时，我们也可以把这些请求封装成一个函数
并把它作为一个参数传递给另外一个函数，委托另外一个函数来执行。比如以下代码
*/

var appendDiv= function(){
	for(var i = 0 ;i<100;i++){
		var  div = document.createElement("div");
		div.innerHTML = i ;
		document.body.appendChild(div);
		div.style.display = 'none';//这段代码在这里合适吗？
	}
};
//改写如下

var appendDiv= function(callback){
	for(var i = 0 ;i<100;i++){
		var  div = document.createElement("div");
		div.innerHTML = i ;
		document.body.appendChild(div);
		if(typeof callback ==='function'){
			callback(div);
		}
	}
};
appendDiv(function(node){
	node.style.display ='none';
});


//
/*

接下来我们来看下Array.prototype.sort方法
这个方法接受一个函数作为参数，这个函数里面封装了数组元素的排序规则
这个方法的使用，我们看到，对数组进行排序是不变的，而使用什么规则进行排序，是可变的
如此，可变的部分我们封装在一个函数里，动态的传入Array.prototype.sort。

*/

[1,5,3].sort(function(a,b){
	return  a-b;
});//从小到大排序



[1,5,3].sort(function(a,b){
	return  b-a;
});//从大到小排序


/*
  函数作为返回值输出
  
  这种应用相比函数作为参数传递，应该场景更多，更能体现函数式编程的巧妙
  
*/
//比如我们可以简单的实现单例模式

var getSingle = function(fn){
	var ret ;
	return function(){
		return ret||(ret=fn.apply(this,arguments));
	};
};

//这个例子既把函数当作参数传递，又在函数执行后返回了另一个函数。

var getScript = getSingle(function(){
	return document.createElement('script');
});
var script1 = getScript(); //<script></script>
var script2 = getScript();

console.log(script1===script2);

//这个调用的过程一环套着一环，需要仔细读代码
//上述例子也实现了闭包

//接下来一个例子，我们来实现数据类型判断

var isType =function(type){
	return  function(obj){
		return  Object.prototype.toString.call(obj)==='[object '+type+']';
	};
};

var isString = isType('String');
isString('hello world');

var isArray = isType('Array');

isArray([2,3]);


/*
接下来，我们来看下，怎么使用高阶函数来实现AOP

 AOP就是面向切面编程，主要作用是把一些核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能
 通常包括日志统计，安全控制，异常处理等。把这些功能抽离出来后，又通过动态织入的方式渗入到业务逻辑模块中

  在JAVA中，可以通过反射和动态代理机制来实现AOP。但对于javascript这种动态语言，AOP的实现更加简单
  
  在javascript中实现AOP，都是指把一个函数动态织入到另外一个函数中。我们可以通过扩展Function.prototype来做到这一点
*/

Function.prototype.before = function(beforefn){
	 var that = this ;
	 return function(){
		 beforefn.apply(this,arguments);
		 return that.apply(this,arguments);
	 };
};

Function.prototype.after = function(afterfn){
	 var that = this ;
	 return function(){
		 var ret =that.apply(this,arguments);
		 afterfn.apply(this,arguments);
		 return ret ;
	 };
};

var func = function(){
	console.log(2);
};
func = func.before(function(){
	console.log(1);
}).after(function(){
	console.log(3);
});
func();

//级联
/*
   有一些方法没有返回值，比如一些设置或修改对象的某个状态却不返回任何值的方法。
   如果让这些方法返回this而不是undefined，就可以启用级联，如上面的方法
   
   级联技术可以产生极富表现力的接口。一个接口没必要每次做太多事情
*/

//高阶函数的其它特性
//先来看一个方法

Function.prototype.curry = function(){
	var slice = Array.prototype.slice;
	var arr = slice.apply(arguments);
	var that = this ;
	return function(){
	   var newarr= arr.concat(slice.apply(arguments));
	   return that.apply(null,newarr);
	};
};

function add(x,y){
	return x+y;
};

var add1 = add.curry(1);
add1(10); 
add1(100);
add(1,100);

---
add.apply(null,[1,10]);

//curry方法通过创建一个保存着原始函数和要被套用的参数的闭包来工作
//这既是所谓的函数“柯里化”:把多参数函数转换为一系列单参数函数并进行调用


//现在有一个场景，需要设计一个函数，前面每次调用，不会真正去计算，而是把参数保存下来，等到需要计算的再一起计算

var currying = function(fn){
	var args = [] ;
	return function(){
		if(arguments.length === 0){
			return fn.apply(this,args);
		}else {
			Array.prototype.push.apply(args,arguments);
			return arguments.callee;
		}
	};
	
}
var add = (function(){
	var sum = 0 ;
	return function(){
		for(var i=0;l=arguments.length,i<l;i++){
			sum+=arguments[i];
		}
		return  sum;
	};
})();

var add  = currying(add);
add(1);
add(2);
add(3);

add();









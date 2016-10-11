/*
  前面介绍了ANGULAR JS 框架的基本的知识体系，框架比较大
  难以一一覆盖，得在基础上加以应用，才能掌握。
  最后一节课，不再去探讨这个框架的，我们集中讨论js中几个设计模式
  
  关于设计模式，其实我们学过了js来实现单例模式、命令模式、AOP等设计模式
  不知道大家还记不记得，是时候回头温习一下了
  
  这节课我们来认识下策略模式、代理模式、发布-订阅模式
*/

/*
 首先单刀独入
 
 什么是策略模式？
 策略模式的定义就是:定义一系列算法，把它们一个个封装起来，并且使得它们可以相互替换
 
 在程序设计中，我们常常遇到这种情况，要实现一个功能，有多种方案可以选择。比如
 一个压缩文件的程序，既可以选择zip算法,也可以选择gzip算法
 这些算法灵活多样，而且可以随意互相替换
 
 我们可以使用策略模式来计算奖金
 比如公司的年终奖，可以根据员工的工资基数和绩效的级别来计算
 比如绩效等级为A的，发放4个月奖金，以此类推
 所以不同的等级对应不同的算法
 按照我们的习惯，一开始就这样设计
 */
 
 var calcBonus = function(level,salary){
	 if(level==='A'){
		 return salary*4;
	 }
	 if(level==='B'){
		 return salary*3
	 }
	 //....
 }
 
//这样设计好吗？代码很简单，但如果绩效等级越多，这个函数会越来越庞大，而且缺乏弹性
//如果原来的绩效等级设计的有问题，那得对代码进行修修补补
//而且算法的复用性差，要是别的地方需要重用，需要复制粘帖

//我们考虑重构这段代码
//使用组合函数进行拆分，把各个算法拆分单独的函数

var  performanceA = function(salary){
	return salary *4;
};
var  performanceB = function(salary){
	return salary *3;
};
var  performanceC = function(salary){
	return salary *2;
};
var calcBonus = function(level,salary){
	 if(level==='A'){
		 return performanceA(salary);
	 }
	 if(level==='B'){
		 return performanceB(salary);
	 }
	 if(level==='C'){
		 return performanceC(salary);
	 }
};

//代码看起来顺眼多了，但是还没有解决，最终的算法函数可能越来越庞大，而且系统变化时，缺乏弹性

//接下来，我们考虑使用策略模式来重构代码
//我们在很早的课程中提到过，在程序设计的过程中，要把不变的部分和变化的部分隔开
//这个原则同样是每个设计模式的主题，策略模式也不例外
//策略的模式的目的就是将算法的使用和算法的实现分离开来
/*
  一个基于策略模式的程序至少由两部分组成
  第一部分是一组策略类，策略类封装了具体的算法并复杂具体的计算过程。
  第二部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类
*/

var performanceA = function(){};
performanceA.prototype.calculate=function(salary){
	return salary*4;
};

var performanceB = function(){};
performanceB.prototype.calculate=function(salary){
	return salary*3;
};

var performanceC = function(){};
performanceC.prototype.calculate=function(salary){
	return salary*2;
};

var Bonus = function(){
	this.salary = null;
	this.level = null;
};
Bonus.prototype.setSalary = function(salary){
	this.salary = salary;
};
Bonus.prototype.setLevel = function(level){
	this.level = level;
};
Bonus.prototype.getBonus = function(){
	this.level.calculate(this.salary);
};

//调用
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setLevel(new performanceA());
bonus.getBonus();

//上面的实现是仿造传统的面向对象语言的实现
//接下来我们看纯粹的javascript怎么实现策略模式
var levels = {
	'A':function(salary){
		return salary*4
	},
    'B':function(salary){
		return salary*3
	},
   'C':function(salary){
		return salary*2
	}
}
var calcBonus= function(level,salary){
	return levels[level](salary);
};

//通过上面的改造，代码结构变得更加简介，算法的实现和使用分离开来了
//从上面的改造中，好好体会下多态在其中所起的作用

//使用策略模式来实现表单验证
var strategies = {
	isNotEmpty:function(value,errorMsg){
		if(value===''){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length<length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/(^1[|3|5|8][0-9]{9}$)/.test(value)){
			return errorMsg;
		}
	}
};

var validator = function(){
	this.cache = [];
};

validator.prototype.add = function(dom,rule,errorMsg){
	var ary = rule.split(':');
	this.cache.push(function(){
		var strategy = ary.shift();
		ary.unshift(dom.value);
		ary.push(errorMsg);
		return strategies[strategy].apply(dom,ary);
	});
}

validator.prototype.start = function(){
	for(var i=0,validatorFunc;validatorFunc=this.cache[i++]){
		var msg =validatorFunc();
		if(msg){
			return msg;
		}
	}
}

/*
   接下来我们来看什么是代理模式?
   代理模式就是为一个对象提供一个代用品或占位符，以便控制它的访问
   代理的模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象
   来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后
   再把请求转交给本体对象
*/

//一个简单的代理例子

var Flower = function(){
};
var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var A = {
	receiveFlower:function(flower){
		console.log('收到花'+flower)；
	}
}；
xiaoming.sendFlower(A);
//上面是不用代理的模式的情况，接下来引入代理B，如果小明不能直接送花给A，必须通过B来送
var Flower = function(){
};
var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var B = {
	receiveFlower:function(flower){
		A.receiveFlower(flower);
	}
}；

var A = {
	receiveFlower:function(flower){
		console.log('收到花'+flower);
	}
};
xiaoming.sendFlower(B);
//上面两段代码结果一致，但我们完成了一个简单的代理模式的编写
//小明直接送花给女神，女神拒收的概率很大，比如送的时间不适宜，或者女神心情不好
//B作为女神的好朋友，对她很了解，所以通过B来送，被接收的概率很大
//B可以我们过滤掉一些不良情况

var B = {
	receiveFlower:function(flower){
		A.listenGoodMood(function(){
			A.receiveFlower(flower);
		});
	}
};
var A = {
	receiveFlower:function(flower){
		console.log('收到花'+flower);
	},
	listenGoodMood:function(fn){
		setTimeout(function(){
			fn();
		},10000);
	}
};

/*
 两种代理模式：保护代理和虚拟代理
 从上面的例子，我们可以看到两种代理模式的影子
 B可以帮助A过滤掉一些请求，比如送花的人年龄太大或者不是高富帅，这种请求
 可直接在代理B处过滤掉，这种代理叫做保护代理
 
 另外一种情况是，如果现实中的花价格昂贵，导致new Flower()是代价昂贵的操作
 那么可以把new Flower()的操作交给代理B去执行，代理B会选择在A心情好的时候再操作
 new Flower(),这是代理的另外一种形式，叫做虚拟代理。
 虚拟代理是把一些开销很大的对象，延迟到真正需要它的时候才去创建
*/
var B = {
	receiveFlower:function(flower){
		A.listenGoodMood(function(){
			var flower = new Flower();
			A.receiveFlower(flower);
		});
	}
};

/*
  发布-订阅模式
  这种模式也叫观察者模式，它定义对象间的一种一对多的依赖关系
  当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
  在javascript中，我们一般用事件模型来代替传统的发布-订阅模式
*/

var salesOffices = {};
salesOffices.clientList ={};
salesOffices.listen = function(key,fn){
	if(!this.clientList[key]){
		this.clientList[key] = [];
	}
	this.clientList[key].push(fn);
};
salesOffices.trigger = function(){
	var key = Array.prototype.shift.call(arguments),
	fns = this.clientList[key];
	if(!fns||fns.length===0){
		return false;
	};
	for(var i=0,fn;fn=fns[i++]){
		fn.apply(this,arguments);
	}
};
//把发布订阅的功能提取出来
var event ={
	clientList:[],
	listen:function(key,fn){
			if(!this.clientList[key]){
				this.clientList[key] = [];
			}
			this.clientList[key].push(fn);
     },
	 trigger: function(){
				var key = Array.prototype.shift.call(arguments),
				fns = this.clientList[key];
				if(!fns||fns.length===0){
					return false;
				};
				for(var i=0,fn;fn=fns[i++]){
					fn.apply(this,arguments);
				}
			},
    remove:function(key,fn){
		var fns = this.clientList[key];
		if(!fns){
			return false;
		}
		if(!fn){
			fns&&(fns.length=0);
		}else {
			for(var l = fns.length-1;l>=0;l--){
				var _fn = fns[l];
				if(_fn===fn){
					fns.splice(l,1);
				}
			}
		}
	}
};

var installEvent = function(obj){
	for(var i in event){
		obj[i]=event[i];
	}
}
//angular js 数据双向绑定
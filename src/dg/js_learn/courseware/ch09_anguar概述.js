/*
   通过上门课的实例，我们看到AngularJS 使得开发现代的单一页面应用程序（SPAs：Single Page Applications）变得更加容易。
	1. 把应用程序数据绑定到 HTML 元素。
	2. 可以克隆和重复 HTML 元素。
	3. 可以隐藏和显示 HTML 元素。
	4. 可以在 HTML 元素"背后"添加代码。
	5. 支持输入验证。
*/

/*
AngularJS 表达式

表达式写在双大括号内：{{ expression }}。
表达式把数据绑定到 HTML，与 ng-bind 指令效果一致
将在表达式书写的位置"输出"数据。

AngularJS表达式很像 JavaScript 表达式：它们可以包含文字、运算符和变量。
比如 {{ 5 + 5 }} 或 {{name + " " + age }}
在AngularJS中，数字就像 JavaScript 数字;字符串就像 JavaScript 字符串
对象就像 JavaScript 对象；数组就像 JavaScript 数组

AngularJS 表达式与JavaScript 表达式
类似于 JavaScript 表达式，AngularJS 表达式可以包含字母，操作符，变量；可以写在 HTML 中。
不同的是AngularJS 表达式不支持条件判断，循环及异常，AngularJS表达式支持过滤器。

*/
//诸如此类表达式都是合法的
1+2
3*10|currency
item.name
//这两种绑定数据到html的方式效果一直，如果如果使用{{}}在页面完全加载前会显示在页面上，但前者不会
<div ng-bind='money|currency'>test</div>
<div>{{money|currency}}</div>


/*
  angular js 过滤器
  什么是过滤器？正如其名，作用是接收一个输入，通过某个规则进行处理，然后返回处理后的结果
  ，主要用在数据的格式化上。
  angular内置了一些过滤器，比如:
  currency:格式化数字为转换数据，可以使用:指定币种，默认是美元
  date :日期格式化,date:'yyyy-MM-dd hh:mm:ss EEEE'
  filter:从数组项中选择一个子集,filter:匹配子串
  json :格式化json对象
  LimitTo:限制数组长度或者字符串长度
  lowercase:格式化字符串为小写
  orderBy:根据某个表达式排列数组
  uppercase:格式化字符串为大写
  number :数字
  
  过滤器有两种使用方法
  1.在模板中使用过滤器，比如
*/
{{expression|filter}}//|是管道字符
app.controller('filterCtr',function($scope){
	 $scope.money = 100;
});
<div ng-controller ='filterCtr'>
  投注 金额 ：{{money|currency:'￥'}
</div>

//也可以多个filter连用，上一个filter的输出将作为下一个filter的输入
{{expression|filter1|filter2|filter3}}

//filter也可以接收参数，参数用：进行分割
{{expression|filter1:arg1:arg2...}}


/*
  除了对{{}}中的数据进行格式化，还可以在指令中使用filter，例如先对数组进行过滤处理，然后再循环输出
  
  orderBy:根据某个表达式排列数组
*/
app.controller('filterCtr',function($scope){
	 $scope.money = 100;
	 $scope.family = [{name:'bob',age:23},{name:'jack',age:34},{name:'tick',age:12}];
});
<span ng-repeat = "item in family|orderBy:'age'"> 
{{item.name}}_{{item.age}} 
</span>

/*
   2. 在controller和service中使用filter
   使用个别过滤器，或者使用$filter服务
*/
app.controller('filterCtr',function($scope,$filter){
	 $scope.money = 100;
	 $scope.family = [{name:'bob',age:23},{name:'jack',age:34},{name:'tick',age:12}];
	 $scope.money2 = $filter('currency')(1000);
});

/*
   除了内置的过滤器，还可以自定义过滤器：使用module的filter方法，返回一个函数，该函数接收输入值，并返回处理后的结果
*/
app.filter('oddage',function(){
	return function(inputArray){
		var arr = [];
		for(var i = 0;i<inputArray.length;i++){
			if(inputArray[i].age%2!=0){
				arr.push(inputArray[i]);
			}
		}
		return arr;
	   
	};
})

/*
  angular js 服务
  在angular中你可以创建自己的服务，或使用内建服务
  
  什么是服务呢？
  在angular中，服务就是一个函数或对象，可在angular js应用中使用。
  
  Angular js内建了30多个服务
  
  比如$location服务，可以返回当前页面的URL地址，是对window.location的封装
*/
function HelloController($scope,$location){
	$scope.greeting = {url:$location.absUrl()};
}
/*
   $http服务
   $http是angular应用最常用的服务，用于向服务器发送请求，响应服务器传送过来的数据
   我们改写下获取历史数据的方法
*/
var url = '/MaWeb/data/data.txt';
$http.get(url).success(function(data,status,headers,config){
	var dataArr = data.split('\n');
	$scope.histroyList = [];
	for(var i = 0;i<dataArr.length;i++){
		var ball = dataArr[i].split(',');
		var item = {};
		item['firstBall']=ball[0];
		item['sencondBall']=ball[1];
		item['thirdBall']=ball[2];
		item['fifthBall']=ball[3];
		item['fifthBall']=ball[4];
		item['sixBall']=ball[5];
		item['blueBall']=ball[6];
		$scope.histroyList[i]=item;
	}		
});
/*
 $timeout 服务
 $timeout 服务对应了JS中的window.setTimeout函数
 定时任务
*/
function HelloController($scope,$location,$timeout){
	$scope.greeting = {url:$location.absUrl()};
	//定时触发
	$timeout(function(){
		$scope.greeting.url ='hello angular'
	},2000);
}
/*
 $interval服务
 $interval服务对应于js的window.setInterval函数，间歇性执行任务
 $interval.cancel取消任务
 使用这个服务，改写机选号码的程序
*/
var app = angular.module('app',[]);
app.controller('HelloController',function ($scope,$location,$timeout,$interval){
	$scope.greeting = {url:$location.absUrl()};
	//定时触发
	$timeout(function(){
		$scope.greeting.url ='hello angular'
	},2000);
	$scope.theTime = new Date().toLocaleTimeString();
	$interval(function(){
		$scope.theTime = new Date().toLocaleTimeString();
	},1000);
	
}
);
/*
 除了使用内置的服务，我们还可以自定义服务
*/
app.service('maservice',function(){
	this.add = function(a,b){
		return a+b;
	};
});
//然后跟内置服务一样使用，可以在控制器、指令、过滤器或其他服务中使用它
var app = angular.module('app',[]);
app.service('maservice',function(){
	this.add = function(a,b){
		return a+b;
	};
});
app.controller('HelloController',function ($scope,$location,$timeout,$interval,maservice){
	$scope.greeting = {url:$location.absUrl()};
	//定时触发
	$timeout(function(){
		$scope.greeting.url ='hello angular'
	},2000);
	$scope.theTime = new Date().toLocaleTimeString();
	$interval(function(){
		$scope.theTime = new Date().toLocaleTimeString();
	},1000);
	$scope.greeting.url = maservice.add(3,5);
	
}
);
/*

AngularJS 指令

在angular中，我们可以通过指令来扩展html标签，增加声明式语法来实现我们想做的任何事情。
一个指令用来引入新的html语法，指令是DOM元素上的标记，使元素拥有特定的行为
指令背后的思想很简单，就是通过对元素绑定事件监听或者改变DOM而使html拥有真实的交互性

AngularJS的指令，一般带有前缀 ng-，
ng-app 指令初始化一个 AngularJS 应用程序。
ng-init 指令初始化应用程序数据。
ng-model 指令把元素值（比如输入域的值）绑定到应用程序。
ng-bind 指令把应用程序数据绑定到 HTML 视图。
ng-repeat:重复特定的元素
ng-show:有条件的显示一个元素

其中ng部分代表angular的命名空间，连词符后面的内容代表指令的名称
*/
<div ng-app="" ng-init="firstName='Ma'">
<p>姓名为 <span ng-bind="firstName"></span></p>
</div>

/*
   我们也可以自定义自己的指令
   
*/
app.directive('namespaceDirectiveName',function(injectables){
	var directiveDefinitionObject = {
		restrict:string,
		priority:number,
		template:string,
		templateUrl:string,
		replace:bool,
		transclude:bool,
		scope:bool or object,
		controller:function controllerConstructot($scope,$element,$attrs,$transclude),
		require:string,
		link:function postLink(scope,iElement,iAttrs){},
		compile:function complie(tElement,tAttrs,transclude){
			return {
				pre: function preLink(scope,iElement,iAttrs,controller){},
				post: function postLink(scope,iElement,iAttrs,controller){}
			}
		}
	};
	return directiveDefinitionObject;
});
/*
  namespaceDirectiveName ：指令名称
  injectables :需要的服务，比如$rootScope,$http等
  restrict:描述了指令在模板中的使用方式，包括：元素（E），属性（A）、CSS样式类（C）、注释（M）或者以上几种方式的任意组合
  priority:设置指令在模板中的执行顺序，顺序是相对与元素上的其他指令而言的
  template ： 以字符串的形式编写一个内联模板，如果以URL的方式提供了模板，则此属性会被忽略
  templateUrl:描述加载模板所使用的URL
  replace :如果此指令为true，则替换指令所在元素，如果为false或者不指定，则在当前指令追加到所在的元素内部
  transclude；把指令元素中原来的子节点移动到新模板内部
  sope:为当前指令创建一个新的作用域，而不是使之继承父作用域
  controller:创建一个控制器，会暴露一个api，利用这个API可以在多个指令之间进行通信
  require: 要求必须存在另外一个指令，当前指令才能正确运行
  link:使用编程的方式修改最终生成的DOM元素实例，添加事件监听器，并设置数据绑定
  compile:在使用ng-repeat时，用编程的方式修改DOM模板，从而实现同一个指令跨越多个实例的特性,compile函数也可以
  返回一个link函数，用它来修改产生的元素实例
  
  我们现在来定义我们第一个指令
*/
app.directive('helloWorld',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3>Welcom to my lesson for javascript</h3>'
	}
});
//怎么使用呢？
<hello-world></hello-world> //元素的方式
<hello-world />
<div hello-world>test</div> //replace 为true时，会覆盖，为false呢，可以试下

//如果我们想把html元素中原有的元素加到我们的模板中，怎么处理呢，可以使用内嵌的方式，我们改写下指令
app.directive('helloWorld2',function(){
	return {
		restrict:'A',
		template :'<h3>Welcom to my lesson for javascript,<span ng-transclude></span></h3>',
		transclude:true
	}
});
//以下调用显示什么？
 <div hello-world2>test</div>

//插入模板的方式很有用，比如可以把一些使用频率高，通用的html元素，做成指令的形式调用。
//以上例子都是静态的html，对于指令而言，真正有趣的事情，是在compile和link函数中

/*
  先来了解下angular 的初始化过程，它分为三个阶段
  1. 加载脚本：加载angular库，并查找ng-app指令，从而找到应用的边界
  2. 编译阶段:angular将会遍历DOM结构，标识出模板中注册的所有指令，对于每个指令，都会根据指令定义的规则
  (template，repace，transclude等)来转换DOM结构，如果存在compile函数，则调用它。调用compile函数将返回一个
  编译好的template函数，它将会调用从所有中搜集而来的link函数
  3. 链接阶段:为了让视图成为动态的，angular会对每个指令运行一个link函数。link函数一般操作是
  在DOM或者模型上创建监听器，监听器会使视图和模型的内容随时保持同步
  
  compile函数只在编译阶段运行一次，对于指令的每个实例link函数会被执行多次
  compile函数和link函数的区别：complie函数不能访问scope,并且必须返回一个link函数
  多数的指令并不需要对模板进行转换，所以，大部分情况下只要编写link函数就可以
  
  现在来改写上面的例子
*/
<div ng-controller='DirectCtr'>
	<input ng-model='color' placeholde='enter a color'>
	<div hello-world3>test</div>
</div>

app.directive('helloWorld3',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		//scope父controller的scope
		// iElement指令的包装DOM元素
		//iAttrs一个包含了指令所在元素的属性的标准化的参数对象
		link:function(scope,iElement,iAttrs){
			iElement.bind('click',function(){
				iElement.css('background-color','white');
				scope.$apply(function(){
					scope.color = 'white';
				});
			});
			iElement.bind('mouseover',function(){
				iElement.css('cursor','pointer');
			});
		}
	}
});
//ng-repeat 元素的复制是在link之前完成

/*
   指令的作用域
   scope对象的类型有三种选择
   1.指令对应的DOM元素上存在的scope对象
   2. 可以创建一个新的scope对象,它继承了外层控制器的scope。在继承树中，位于当前的scope对象上方的所有scope
   对象的值都可以被读取。对于DOM元素里面的任何指令，如果徐奥这种类型的scope，也可以共享这个scope
   并且可以用它和树中其它scope进行通信
   3. 使用独立的scope对象，它不会从父对象上继承模型的任何属性，当创建可复用的组件
   并且需要把当前指令的操作和父scope隔离开时，你就需要使用这个选项
   
   现有的scope scope:false （如果不指定，就是默认值）
   新scope scope:true
   独立scope  scope:{//属性名和绑定风格}
 */
app.directive('helloWorld3',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3">Welcom to my lesson for javascript</h3>',
		scope:{}, //指定了一个独立的scope
		link:function(scope,iElement,iAttrs){
			iElement.bind('click',function(){
				iElement.css('background-color','white');
				scope.$apply(function(){
					scope.color = 'white';
				});
			});
			iElement.bind('mouseover',function(){
				iElement.css('cursor','pointer');
			});
		}
	}
});
/*
  使用独立的scope，能够保证我们的指令是自包含的，可以被很容易插入到html中，内部不能访问父的scope，
  保证了父scope不被污染。
  当然，使用独立的scope并不意味着完全不能访问父scope的属性，比如使用$parent属性
  
  如果指定了独立的scope上述代码就不能工作了
  可以采取一定的策略
   @ 把当前属性作为一个字符串传递，可以绑定来自外层的scope的值，在属性值中插入{{}}即可
   = 绑定当前属性 ,带有一个来自父scope的属性
   & 传递一个来自父scope的函数，稍后调用
*/
//使用@进行单向绑定
app.directive('helloWorld4',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		scope:{color:'@colorAttr'}, //指定了一个独立的scope
		link:function(scope,iElement,iAttrs){
			iElement.bind('click',function(){
				iElement.css('background-color','white');
				scope.$apply(function(){
					scope.color = 'white';
				});
			});
			iElement.bind('mouseover',function(){
				iElement.css('cursor','pointer');
			});
		}
	}
});
//使用=实现双向绑定
app.directive('helloWorld5',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		scope:{color:'='}, //指定了一个独立的scope
		link:function(scope,iElement,iAttrs){
			iElement.bind('click',function(){
				iElement.css('background-color','white');
				scope.$apply(function(){
					scope.color = 'white';
				});
			});
			iElement.bind('mouseover',function(){
				iElement.css('cursor','pointer');
			});
		}
	}
});
//使用&执行父scope的函数
app.directive('helloWorld6',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		scope:{shout:'&'}, //指定了一个独立的scope
		link:function(scope,iElement,iAttrs){
			iElement.bind('click',function(){
				iElement.css('background-color','white');
				scope.$apply(function(){
					scope.color = 'white';
				});
				scope.shout();
			});
			iElement.bind('mouseover',function(){
				iElement.css('cursor','pointer');
			});
		}
	}
});
/*
  controller函数和require
  
  如果允许其它的指令和我们的指令发生交互，需要使用controller函数。
  比如有些情况，需要通过组合两个指令来实现一个UI组件，可以如下方式给指令添加一个controller函数
  
*/
app.directive('outerDirective',function(){
	return {
		scope:{},
		restrict:'AE',
	    controller:function($scope,$compile,$http){
			this.addChild = function(nestedDirective){
				alert('Got the message from nestedDirective：'+nestedDirective.message);
			};
		}
	}
});

// 上面的程序，为指令添加了一个outerDirective的controller，当另一个指令想要交互时，
//需要声明它对这个指令的controller实例的引用，使用require
app.directive('innerDirective',function(){
	return {
		scope:{},
		restrict:'AE',
		require:'^outerDirective',//告诉angular在元素以及她的父元素中搜索controller，这样找到的controller实例会作为第四个参数传递给link函数
	    link:function(scope,elem,attrs,controllerInstance){
		    scope.message = 'Hi, I am here';
			controllerInstance.addChild(scope);
		}
	}
});

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
app.controller('filterCtr',function($scope,$filter){
	 $scope.money = 100;
	 $scope.family = [{name:'bob',age:23},{name:'jack',age:34},{name:'tick',age:12}];
	 $scope.money2 = $filter('currency')(1000);
});
app.directive('helloWorld',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3>Welcom to my lesson for javascript</h3>'
	}
});
app.directive('helloWorld2',function(){
	return {
		restrict:'A',
		template :'<h3>Welcom to my lesson for javascript,<span ng-transclude></span></h3>',
		transclude:true
	}
});
app.directive('helloWorld3',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
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

app.controller('DirectCtr',function($scope){
	 $scope.shout = function(){
		 alert('hi here');
	 }
});
app.directive('helloWorld4',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my angular lession</h3>',
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
app.directive('helloWorld5',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my angular lession</h3>',
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
function change(value){
	$('#testSpan').html(value);
}


function  SsqController($scope){
	$scope.items = [
    {red1:2,red2:3,red3:6,red4:16,red5:17,red6:26,blue:8},
    {red1:4,red2:5,red3:9,red4:16,red5:17,red6:26,blue:8},
    {red1:07,red2:13,red3:19,red4:20,red5:26,red6:31,blue:8},
   ];
	$scope.remove = function(index){
		$scope.items.splice(index,1);
	}
}


function myAjax(url,sendtpe,asyn)
{
	var xmlhttp;
	//获取XMLHttpRequest对象，需要兼容不同的浏览器
	if (window.XMLHttpRequest){
	  xmlhttp=new XMLHttpRequest();
	}
	else{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//设置回调函数，当异步调用成功之后，做些后续处理
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
		    var div = document.getElementById('content1');
		    div.innerHTML=xmlhttp.responseText;
	    }
	  }
	 //向服务器发送请求
	xmlhttp.open(sendtpe,url,asyn);
	xmlhttp.send();
};


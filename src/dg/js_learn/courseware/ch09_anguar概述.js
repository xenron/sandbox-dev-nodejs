/*
   ͨ�����ſε�ʵ�������ǿ���AngularJS ʹ�ÿ����ִ��ĵ�һҳ��Ӧ�ó���SPAs��Single Page Applications����ø������ס�
	1. ��Ӧ�ó������ݰ󶨵� HTML Ԫ�ء�
	2. ���Կ�¡���ظ� HTML Ԫ�ء�
	3. �������غ���ʾ HTML Ԫ�ء�
	4. ������ HTML Ԫ��"����"��Ӵ��롣
	5. ֧��������֤��
*/

/*
AngularJS ���ʽ

���ʽд��˫�������ڣ�{{ expression }}��
���ʽ�����ݰ󶨵� HTML���� ng-bind ָ��Ч��һ��
���ڱ��ʽ��д��λ��"���"���ݡ�

AngularJS���ʽ���� JavaScript ���ʽ�����ǿ��԰������֡�������ͱ�����
���� {{ 5 + 5 }} �� {{name + " " + age }}
��AngularJS�У����־��� JavaScript ����;�ַ������� JavaScript �ַ���
������� JavaScript ����������� JavaScript ����

AngularJS ���ʽ��JavaScript ���ʽ
������ JavaScript ���ʽ��AngularJS ���ʽ���԰�����ĸ��������������������д�� HTML �С�
��ͬ����AngularJS ���ʽ��֧�������жϣ�ѭ�����쳣��AngularJS���ʽ֧�ֹ�������

*/
//���������ʽ���ǺϷ���
1+2
3*10|currency
item.name
//�����ְ����ݵ�html�ķ�ʽЧ��һֱ��������ʹ��{{}}��ҳ����ȫ����ǰ����ʾ��ҳ���ϣ���ǰ�߲���
<div ng-bind='money|currency'>test</div>
<div>{{money|currency}}</div>


/*
  angular js ������
  ʲô�ǹ����������������������ǽ���һ�����룬ͨ��ĳ��������д���Ȼ�󷵻ش����Ľ��
  ����Ҫ�������ݵĸ�ʽ���ϡ�
  angular������һЩ������������:
  currency:��ʽ������Ϊת�����ݣ�����ʹ��:ָ�����֣�Ĭ������Ԫ
  date :���ڸ�ʽ��,date:'yyyy-MM-dd hh:mm:ss EEEE'
  filter:����������ѡ��һ���Ӽ�,filter:ƥ���Ӵ�
  json :��ʽ��json����
  LimitTo:�������鳤�Ȼ����ַ�������
  lowercase:��ʽ���ַ���ΪСд
  orderBy:����ĳ�����ʽ��������
  uppercase:��ʽ���ַ���Ϊ��д
  number :����
  
  ������������ʹ�÷���
  1.��ģ����ʹ�ù�����������
*/
{{expression|filter}}//|�ǹܵ��ַ�
app.controller('filterCtr',function($scope){
	 $scope.money = 100;
});
<div ng-controller ='filterCtr'>
  Ͷע ��� ��{{money|currency:'��'}
</div>

//Ҳ���Զ��filter���ã���һ��filter���������Ϊ��һ��filter������
{{expression|filter1|filter2|filter3}}

//filterҲ���Խ��ղ����������ã����зָ�
{{expression|filter1:arg1:arg2...}}


/*
  ���˶�{{}}�е����ݽ��и�ʽ������������ָ����ʹ��filter�������ȶ�������й��˴���Ȼ����ѭ�����
  
  orderBy:����ĳ�����ʽ��������
*/
app.controller('filterCtr',function($scope){
	 $scope.money = 100;
	 $scope.family = [{name:'bob',age:23},{name:'jack',age:34},{name:'tick',age:12}];
});
<span ng-repeat = "item in family|orderBy:'age'"> 
{{item.name}}_{{item.age}} 
</span>

/*
   2. ��controller��service��ʹ��filter
   ʹ�ø��������������ʹ��$filter����
*/
app.controller('filterCtr',function($scope,$filter){
	 $scope.money = 100;
	 $scope.family = [{name:'bob',age:23},{name:'jack',age:34},{name:'tick',age:12}];
	 $scope.money2 = $filter('currency')(1000);
});

/*
   �������õĹ��������������Զ����������ʹ��module��filter����������һ���������ú�����������ֵ�������ش����Ľ��
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
  angular js ����
  ��angular������Դ����Լ��ķ��񣬻�ʹ���ڽ�����
  
  ʲô�Ƿ����أ�
  ��angular�У��������һ����������󣬿���angular jsӦ����ʹ�á�
  
  Angular js�ڽ���30�������
  
  ����$location���񣬿��Է��ص�ǰҳ���URL��ַ���Ƕ�window.location�ķ�װ
*/
function HelloController($scope,$location){
	$scope.greeting = {url:$location.absUrl()};
}
/*
   $http����
   $http��angularӦ����õķ������������������������Ӧ���������͹���������
   ���Ǹ�д�»�ȡ��ʷ���ݵķ���
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
 $timeout ����
 $timeout �����Ӧ��JS�е�window.setTimeout����
 ��ʱ����
*/
function HelloController($scope,$location,$timeout){
	$scope.greeting = {url:$location.absUrl()};
	//��ʱ����
	$timeout(function(){
		$scope.greeting.url ='hello angular'
	},2000);
}
/*
 $interval����
 $interval�����Ӧ��js��window.setInterval��������Ъ��ִ������
 $interval.cancelȡ������
 ʹ��������񣬸�д��ѡ����ĳ���
*/
var app = angular.module('app',[]);
app.controller('HelloController',function ($scope,$location,$timeout,$interval){
	$scope.greeting = {url:$location.absUrl()};
	//��ʱ����
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
 ����ʹ�����õķ������ǻ������Զ������
*/
app.service('maservice',function(){
	this.add = function(a,b){
		return a+b;
	};
});
//Ȼ������÷���һ��ʹ�ã������ڿ�������ָ�������������������ʹ����
var app = angular.module('app',[]);
app.service('maservice',function(){
	this.add = function(a,b){
		return a+b;
	};
});
app.controller('HelloController',function ($scope,$location,$timeout,$interval,maservice){
	$scope.greeting = {url:$location.absUrl()};
	//��ʱ����
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

AngularJS ָ��

��angular�У����ǿ���ͨ��ָ������չhtml��ǩ����������ʽ�﷨��ʵ�������������κ����顣
һ��ָ�����������µ�html�﷨��ָ����DOMԪ���ϵı�ǣ�ʹԪ��ӵ���ض�����Ϊ
ָ����˼��ܼ򵥣�����ͨ����Ԫ�ذ��¼��������߸ı�DOM��ʹhtmlӵ����ʵ�Ľ�����

AngularJS��ָ�һ�����ǰ׺ ng-��
ng-app ָ���ʼ��һ�� AngularJS Ӧ�ó���
ng-init ָ���ʼ��Ӧ�ó������ݡ�
ng-model ָ���Ԫ��ֵ�������������ֵ���󶨵�Ӧ�ó���
ng-bind ָ���Ӧ�ó������ݰ󶨵� HTML ��ͼ��
ng-repeat:�ظ��ض���Ԫ��
ng-show:����������ʾһ��Ԫ��

����ng���ִ���angular�������ռ䣬���ʷ���������ݴ���ָ�������
*/
<div ng-app="" ng-init="firstName='Ma'">
<p>����Ϊ <span ng-bind="firstName"></span></p>
</div>

/*
   ����Ҳ�����Զ����Լ���ָ��
   
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
  namespaceDirectiveName ��ָ������
  injectables :��Ҫ�ķ��񣬱���$rootScope,$http��
  restrict:������ָ����ģ���е�ʹ�÷�ʽ��������Ԫ�أ�E�������ԣ�A����CSS��ʽ�ࣨC����ע�ͣ�M���������ϼ��ַ�ʽ���������
  priority:����ָ����ģ���е�ִ��˳��˳���������Ԫ���ϵ�����ָ����Ե�
  template �� ���ַ�������ʽ��дһ������ģ�壬�����URL�ķ�ʽ�ṩ��ģ�壬������Իᱻ����
  templateUrl:��������ģ����ʹ�õ�URL
  replace :�����ָ��Ϊtrue�����滻ָ������Ԫ�أ����Ϊfalse���߲�ָ�������ڵ�ǰָ��׷�ӵ����ڵ�Ԫ���ڲ�
  transclude����ָ��Ԫ����ԭ�����ӽڵ��ƶ�����ģ���ڲ�
  sope:Ϊ��ǰָ���һ���µ������򣬶�����ʹ֮�̳и�������
  controller:����һ�����������ᱩ¶һ��api���������API�����ڶ��ָ��֮�����ͨ��
  require: Ҫ������������һ��ָ���ǰָ�������ȷ����
  link:ʹ�ñ�̵ķ�ʽ�޸��������ɵ�DOMԪ��ʵ��������¼������������������ݰ�
  compile:��ʹ��ng-repeatʱ���ñ�̵ķ�ʽ�޸�DOMģ�壬�Ӷ�ʵ��ͬһ��ָ���Խ���ʵ��������,compile����Ҳ����
  ����һ��link�������������޸Ĳ�����Ԫ��ʵ��
  
  �����������������ǵ�һ��ָ��
*/
app.directive('helloWorld',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3>Welcom to my lesson for javascript</h3>'
	}
});
//��ôʹ���أ�
<hello-world></hello-world> //Ԫ�صķ�ʽ
<hello-world />
<div hello-world>test</div> //replace Ϊtrueʱ���Ḳ�ǣ�Ϊfalse�أ���������

//����������htmlԪ����ԭ�е�Ԫ�ؼӵ����ǵ�ģ���У���ô�����أ�����ʹ����Ƕ�ķ�ʽ�����Ǹ�д��ָ��
app.directive('helloWorld2',function(){
	return {
		restrict:'A',
		template :'<h3>Welcom to my lesson for javascript,<span ng-transclude></span></h3>',
		transclude:true
	}
});
//���µ�����ʾʲô��
 <div hello-world2>test</div>

//����ģ��ķ�ʽ�����ã�������԰�һЩʹ��Ƶ�ʸߣ�ͨ�õ�htmlԪ�أ�����ָ�����ʽ���á�
//�������Ӷ��Ǿ�̬��html������ָ����ԣ�������Ȥ�����飬����compile��link������

/*
  �����˽���angular �ĳ�ʼ�����̣�����Ϊ�����׶�
  1. ���ؽű�������angular�⣬������ng-appָ��Ӷ��ҵ�Ӧ�õı߽�
  2. ����׶�:angular�������DOM�ṹ����ʶ��ģ����ע�������ָ�����ÿ��ָ��������ָ���Ĺ���
  (template��repace��transclude��)��ת��DOM�ṹ���������compile�������������������compile����������һ��
  ����õ�template��������������ô��������Ѽ�������link����
  3. ���ӽ׶�:Ϊ������ͼ��Ϊ��̬�ģ�angular���ÿ��ָ������һ��link������link����һ�������
  ��DOM����ģ���ϴ�������������������ʹ��ͼ��ģ�͵�������ʱ����ͬ��
  
  compile����ֻ�ڱ���׶�����һ�Σ�����ָ���ÿ��ʵ��link�����ᱻִ�ж��
  compile������link����������complie�������ܷ���scope,���ұ��뷵��һ��link����
  ������ָ�����Ҫ��ģ�����ת�������ԣ��󲿷������ֻҪ��дlink�����Ϳ���
  
  ��������д���������
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
		//scope��controller��scope
		// iElementָ��İ�װDOMԪ��
		//iAttrsһ��������ָ������Ԫ�ص����Եı�׼���Ĳ�������
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
//ng-repeat Ԫ�صĸ�������link֮ǰ���

/*
   ָ���������
   scope���������������ѡ��
   1.ָ���Ӧ��DOMԪ���ϴ��ڵ�scope����
   2. ���Դ���һ���µ�scope����,���̳�������������scope���ڼ̳����У�λ�ڵ�ǰ��scope�����Ϸ�������scope
   �����ֵ�����Ա���ȡ������DOMԪ��������κ�ָ��������������͵�scope��Ҳ���Թ������scope
   ���ҿ�����������������scope����ͨ��
   3. ʹ�ö�����scope����������Ӹ������ϼ̳�ģ�͵��κ����ԣ��������ɸ��õ����
   ������Ҫ�ѵ�ǰָ��Ĳ����͸�scope���뿪ʱ�������Ҫʹ�����ѡ��
   
   ���е�scope scope:false �������ָ��������Ĭ��ֵ��
   ��scope scope:true
   ����scope  scope:{//�������Ͱ󶨷��}
 */
app.directive('helloWorld3',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3">Welcom to my lesson for javascript</h3>',
		scope:{}, //ָ����һ��������scope
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
  ʹ�ö�����scope���ܹ���֤���ǵ�ָ�����԰����ģ����Ա������ײ��뵽html�У��ڲ����ܷ��ʸ���scope��
  ��֤�˸�scope������Ⱦ��
  ��Ȼ��ʹ�ö�����scope������ζ����ȫ���ܷ��ʸ�scope�����ԣ�����ʹ��$parent����
  
  ���ָ���˶�����scope��������Ͳ��ܹ�����
  ���Բ�ȡһ���Ĳ���
   @ �ѵ�ǰ������Ϊһ���ַ������ݣ����԰���������scope��ֵ��������ֵ�в���{{}}����
   = �󶨵�ǰ���� ,����һ�����Ը�scope������
   & ����һ�����Ը�scope�ĺ������Ժ����
*/
//ʹ��@���е����
app.directive('helloWorld4',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		scope:{color:'@colorAttr'}, //ָ����һ��������scope
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
//ʹ��=ʵ��˫���
app.directive('helloWorld5',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		scope:{color:'='}, //ָ����һ��������scope
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
//ʹ��&ִ�и�scope�ĺ���
app.directive('helloWorld6',function(){
	return {
		restrict:'AE',
		replace:true,
		template :'<h3 style ="background-color:{{color}}">Welcom to my lesson for javascript</h3>',
		scope:{shout:'&'}, //ָ����һ��������scope
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
  controller������require
  
  �������������ָ������ǵ�ָ�����������Ҫʹ��controller������
  ������Щ�������Ҫͨ���������ָ����ʵ��һ��UI������������·�ʽ��ָ�����һ��controller����
  
*/
app.directive('outerDirective',function(){
	return {
		scope:{},
		restrict:'AE',
	    controller:function($scope,$compile,$http){
			this.addChild = function(nestedDirective){
				alert('Got the message from nestedDirective��'+nestedDirective.message);
			};
		}
	}
});

// ����ĳ���Ϊָ�������һ��outerDirective��controller������һ��ָ����Ҫ����ʱ��
//��Ҫ�����������ָ���controllerʵ�������ã�ʹ��require
app.directive('innerDirective',function(){
	return {
		scope:{},
		restrict:'AE',
		require:'^outerDirective',//����angular��Ԫ���Լ����ĸ�Ԫ��������controller�������ҵ���controllerʵ������Ϊ���ĸ��������ݸ�link����
	    link:function(scope,elem,attrs,controllerInstance){
		    scope.message = 'Hi, I am here';
			controllerInstance.addChild(scope);
		}
	}
});

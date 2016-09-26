/*

  使用$http进行通信
  
  对于ajax应用来说，向服务器发起请求的传统方式是:
  获取一个XMLHttpRequest对象的引用、发起请求、读取响应、检测状态码，最后处理服务端的相应
  类似之前讲过的ajax使用套路
*/

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
        //do somethint 
    }
  }
 //向服务器发送请求
xmlhttp.open("GET",url,true);
xmlhttp.send();
};

/*
   对于简单、常用、而且会经常重复的任务来说，以上做法非常之繁琐，如果要复用，要么封装，要么使用代码库
   
   Angular XHR API 给我们提供了XHR与服务器通信的方法
*/
$http.get('maWeb/ssqquery',{params:{date:'20160728'}}).
success(function(data,status,headers,config){
	....
}).error(function(data,status,headers,config){
	....
});
/*
data 响应体
status 相应的状态值
headers 获取头信息的getter的函数
config 请求中的config对象
*/

//$http.get是ANGULAR js的核心服务$http所提供的众多快捷方法之一。
//前面我们学过jquery，ANGULAR在异步请求的处理方面非常类似
//除了get，我们也可以发送post请求

var  postdata ={remark:'It is good!'};
var config = {params:{date:'20160728'}};
$http.post('maWeb/ssqquery',postdata,config).success(function(data,status,headers,config){
	....
}).error(function(data,status,headers,config){
	....
});
//类似的，还有如下快捷方法
$http.put/post(url,data,config) url、name必填，config可选
$http.get/delete/jsonp/head(url,config) url必填，config可选

//上面的方法，是angular封装好的快捷方法，使用起来相对简单，但是有时候，会存在可配置型不佳的缺点
//比如我们实现一些比较特殊的配置比如给请求添加一些授权头，修改对缓存的处理方式等，就会遇到困难
//在这些情况下，我们可以给请求传递一个可选的配置对象，从而对请求进行深度的配置
$http(config);
//伪代码
$http({
	method:string,
	url:string,
	params:object,
	data:string or object,
	headers: object
	transformRequest:function transform(data,headersGetter) or an arra of functions,
	transformResponse:function transform(data,headersGetter) or an arra of functions,
	cache:boolean or Cache object,
	timeout:number ,
	withCredentials: boolean
	
});

/*
  method: 一个字符串，表示http请求的类型，比如get和post
  url : url字符串，表示资源的绝对或相对资源路径.
  params :一个键和值都是字符串的对象，表示需要转换成URL参数的键和值,并会被附加到URL后面
  比如{key1:'values',key2,'value2'} 会转换成?key1=values1&key2=value2
  如果使用js对象作为MAP里的值，则这个对象会被转换成JSON字符串
  
  data: 一个字符串或者对象，它会被当作请求数据发送
  
  timeout: 在请求超时之前需要等待的毫秒数

*/
//headers：设置特殊的请求头，有两种方式，一种是只为某个特定的请求添加特殊头部,可以如上面指定
headers:{'Authorization':'BASIC XXXXXXX'}
//另一种方式是把请求头设置到每一个发送出去的请求上，相当于把这些请求设置成ANGULAR的默认值
//可以使用$httpProvider.defaults.headers配置对象来配置

angular.config('app',[]),config(function($httpProvider){
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.get['DNT'] = '1';
});

//缓存响应，在请求里加上这个配置就可以启用缓存，然后ANGULAR会缓存来自服务器的响应
//下一次向同一个URL发送请求时，ANGULAR将会返回缓存中的响应内容
cache:true


//转换请求和响应

//对于所有通过$http服务发出的请求和收到的响应来说，angular都会进行一些基本的转换

/*
  转换请求: 如果请求的配置对象属性中包含JS对象，那么把这个对象序列化成JSON格式
  转换响应:如果检测到了XSRF前缀，则直接丢弃。如果检测到了JSON响应，则使用JSON解析器对它进行反序列化

*/

//如果想自己转换，可以自定义
var module = angular.module('app',[]);
module.config(function($httpProvider){
	$httpProvider.defaults.transformRequest=function(data){
		return $.param(data);
	}
});
//$http()返回一个对象,该对象有三个方法
then([success],[error]):
success(function(){})
error(function(){})

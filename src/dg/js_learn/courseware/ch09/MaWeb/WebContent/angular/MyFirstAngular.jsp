<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src ='/MaWeb/jslib/angular.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/majs.js'></script>

<title>MyFirtstAngular</title>
</head>
<body>
  <div ng-app ='app'>
  
   <hello-world></hello-world>
   <div hello-world2>test</div>
   <div ng-controller='DirectCtr'>
        <input ng-model='color' placeholde='enter a color'>
        <div hello-world3>test</div>
        <div hello-world4 color-attr='{{color}}'>test</div>
        
         <div hello-world5 color='color'>test</div>
         
         <div hello-world6 shout='shout()'>test</div>
   </div>
   
		    <div ng-controller='HelloController'>
		       <input ng-model = 'greeting.url'>
		       <p>{{greeting.url}}</p>
		        <p>当前时间:{{theTime}}</p>
		    </div>
		   
		    <div ng-controller ='filterCtr'>
		     <div ng-bind='money|currency'>test</div>
		              投注 金额 ：{{money|currency:'￥'}} 
		                {{money2}}
		       <input ng-model ='test' >
		       <span ng-repeat = "item in family|orderBy:'age'|filter:test">
		        {{item.name}}_{{item.age}}
		       </span>
		       奇数
		       <span ng-repeat = "item in family|oddage">
		        {{item.name}}_{{item.age}}
		       </span>
		      
					<div ng-app="" ng-init="firstName='Ma'">
					<p>姓名为 <span ng-bind="firstName"></span></p>
					</div>
		    </div>
		    <outer-directive>
		       <inner-directive></inner-directive>
		    </outer-directive>
   </div>
 
  
</body>
</html>
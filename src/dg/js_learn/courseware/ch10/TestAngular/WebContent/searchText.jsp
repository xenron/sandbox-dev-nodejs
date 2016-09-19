<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app ='app'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="/TestAngular/jslib/angular.js"></script>
<script type="text/javascript" src="/TestAngular/jslib/controller.js"></script>

<title>搜索框</title>
</head>
<body >
    <div ng-controller= 'listController'>
		  <div>
		        搜索: <input ng-model ='query'>
		  </div>
	   <div>
	      <ul>
	        <li ng-repeat ='item in names|filter:query'>{{item.name}}</li>
	      </ul>
	   </div>
    </div>
</body>
</html>
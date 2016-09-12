<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel = 'stylesheet' href = '/MaWeb/css/macss.css' ><link type />
<script type="text/javascript" src ='/MaWeb/jslib/angular.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/majs.js'></script>

<title>MyFirtstAngular</title>
</head>
<body >
   <div ng-controller='SsqController'>
         <h1>你选中的号码</h1>
         <div ng-repeat = 'item in items'>
            <span>第{{$index+1}}注</span>
            <span class ='redBall' >{{item.red1}}</span>
            <span class ='redBall'>{{item.red2}}</span>
            <span class ='redBall'>{{item.red3}}</span>
            <span class ='redBall'>{{item.red4}}</span>
            <span class ='redBall'>{{item.red5}}</span>
            <span class ='redBall'>{{item.red6}}</span>
            <span class ='blueBall'>{{item.blue}}</span>
         </div>
   </div>
</body>
</html>
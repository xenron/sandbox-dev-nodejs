<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src ='/MaWeb/jslib/angular.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/majs.js'></script>

<title>MyFirtstAngular</title>
</head>
<body>
  <div ng-app>
		    <div ng-controller='HelloController'>
		       <input ng-model = 'greeting.text'>
		       <p>{{greeting.text}}</p>
		    </div>
   </div>
    
  
</body>
</html>
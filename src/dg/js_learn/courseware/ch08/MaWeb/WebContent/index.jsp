<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app='myApp'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel = 'stylesheet' href = '/MaWeb/css/macss.css' ><link />
<script type="text/javascript" src ='/MaWeb/jslib/angular.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/indexController.js'></script>
<title>双色球分析网</title>
</head>
<body>
  
   <div>
	    <div>
	     <h3 align='center'>双色球分析网</h3>
	   </div>
      <div class = 'nav'>
           <ul>
              <li><a href='#/view/choose'>双色球机选</a></li>
              <li><a href='#/view/history'>历史趋势</a></li>
              <li><a href='#/view/otherwise'>其它</a></li>
           </ul>
      </div>
      <div ng-view class='content'>
      </div>
   </div>
</body>
</html>
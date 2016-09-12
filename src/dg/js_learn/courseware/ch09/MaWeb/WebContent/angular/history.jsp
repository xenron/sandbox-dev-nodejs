<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app ='myApp'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel = 'stylesheet' href = '/MaWeb/css/macss.css' ><link />
<script type="text/javascript" src ='/MaWeb/jslib/angular.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/controller.js'></script>

<title>双色球历史趋势</title>
</head>
<body >
   <div ng-controller='historyController'>
          <table class = 'tab'>
          <!-- $index ng-show ng-hide -->
           <tr ng-repeat = 'item in histroyList'>
               <td ng-repeat = 'redball in redList'>
               <span ng-class='{redBall:isSelected({{redball}},{{item}},"redBall"),whiteBall:!isSelected({{redball}},{{item}},"redBall")}'>{{redball}}</span>
               </td>
                <td ng-repeat = 'blueball in blueList'>
               <span ng-class='{blueBall:isSelected({{blueball}},{{item}},"blueBall"),whiteBall:!isSelected({{blueball}},{{item}},"blueBall")}'>{{blueball}}</span>
               </td>
           </tr>
       </table>
   </div>
</body>
</html>
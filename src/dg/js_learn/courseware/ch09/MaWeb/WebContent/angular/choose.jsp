<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app ='myApp'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel = 'stylesheet' href = '/MaWeb/css/macss.css' ><link />
<script type="text/javascript" src ='/MaWeb/jslib/angular.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/controller.js'></script>

<title>双色球机选</title>
</head>
<body >
   <!--html5的输入类型  number -->
   <div ng-controller='chooseController'>
          <table>
           <tr>
             <td><input type ='number' ng-model='balls.redBall1' ng-maxlength='2' ng-minlength='1' ></td>
             <td><input type ='number' ng-model='balls.redBall2' ng-maxlength='2' ng-minlength='1'></td>
             <td><input type ='number' ng-model='balls.redBall3' ng-maxlength='2' ng-minlength='1'></td>
             <td><input type ='number' ng-model='balls.redBall4' ng-maxlength='2' ng-minlength='1'></td>
             <td><input type ='number' ng-model='balls.redBall5' ng-maxlength='2' ng-minlength='1'></td>
             <td><input type ='number' ng-model='balls.redBall6' ng-maxlength='2' ng-minlength='1'></td>
             <td><input type ='number' ng-model='balls.redBall7' ng-maxlength='2' ng-minlength='1'></td>
             <td><button ng-click='start()' ng-disabled='isStart'>开始</button>
                
             </td>
             
           </tr>
       </table>
   </div>
</body>
</html>
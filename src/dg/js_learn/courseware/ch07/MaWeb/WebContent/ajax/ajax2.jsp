<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src ='/MaWeb/jslib/jquery.js'></script>
<script type="text/javascript" src ='/MaWeb/jslib/majs.js'></script>
<script>
$(document).ready(function(){
	   $('#item button').click(function(){
		   var content = this.id+'.htm';
		   var url = '/MaWeb/'+content;
		 //$('#content').load(url);
		  $.get(url,{},function(data){
			  $('#content').html(data);
		  });
		  /*$.post(url,{},function(data){
			  $('#content').html(data);
		  });
		  $.ajax({url:url,type:'get',success:function(data){
			  $('#content').html(data);
		  }})*/
		  
	   });
	});
</script>
<title>Insert title here</title>
</head>
<body>
 <div id ='item'>
    <button id ='a'>书</button>
	<button id ='b'>电器</button>
   </div>
   
   <div id ='content'>
     test
   </div>
   
    <div id ='item1'>
    <button id ='c' onclick ='myAjax("/MaWeb/a.htm","get",true)'>书</button>
	<button id ='d' onclick ='myAjax("/MaWeb/b.htm","get",true)'>电器</button>
   </div>
   
   <div id ='content1'>
     test
   </div>
</body>
</html>

function HelloController($scope,$loction){
	$scope.greeting = {text:'hello'};
}

function change(value){
	$('#testSpan').html(value);
}


function  SsqController($scope){
	$scope.items = [
    {red1:2,red2:3,red3:6,red4:16,red5:17,red6:26,blue:8},
    {red1:4,red2:5,red3:9,red4:16,red5:17,red6:26,blue:8},
    {red1:07,red2:13,red3:19,red4:20,red5:26,red6:31,blue:8},
   ];
	$scope.remove = function(index){
		$scope.items.splice(index,1);
	}
}


function myAjax(url,sendtpe,asyn)
{
	var xmlhttp;
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
		    var div = document.getElementById('content1');
		    div.innerHTML=xmlhttp.responseText;
	    }
	  }
	 //向服务器发送请求
	xmlhttp.open(sendtpe,url,asyn);
	xmlhttp.send();
};


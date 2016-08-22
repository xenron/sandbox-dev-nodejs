$(document).ready(function(){
	
	//通过on方法,可以指定任何DOM事件，并且为该事件添加一种行为，这里的事件是click，行为是相应的匿名函数
	//
	$('#switcher-large').on('click',function(){
		$('body').addClass('large');
	});
	//接下来为另外两个按钮添加事件
	$('#switcher-large').on('click',function(){
		$('body').addClass('large');
	    $('body').removeClass('narrow');

	});
      $('#switcher-default').on('click',function(){
		  $('body').removeClass('narrow');
	  	 $('body').removeClass('large');
	  });
	
		$('#switcher-narrow').on('click',function(){
		$('body').addClass('narrow');
    	 $('body').removeClass('large');
	});
	//这种样式转换器的功能很正常，但是并没有反馈给用户哪个按钮处于当前哪个使用状态
	//一个简单的方法就是，在按钮被单击时，增加一个selected类，同时移除其它按钮上的这个类
	//怎么优雅的处理这种情况呢
	//可以利用事件处理程序运行的上下文
	
	$('#switcher-large').on('click',function(){
		$('body').addClass('large');
	    $('body').removeClass('narrow');
		$('#switcher button').removeClass('selected');
		$(this).addClass('selected');

	});
      $('#switcher-default').on('click',function(){
		  $('body').removeClass('narrow');
	  	 $('body').removeClass('large');
		 $('#switcher button').removeClass('selected');
		$(this).addClass('selected');
	    });
	
		$('#switcher-narrow').on('click',function(){
		$('body').addClass('narrow');
    	 $('body').removeClass('large');
		 	$('#switcher button').removeClass('selected');
		$(this).addClass('selected');
	});
	//当触发事件处理程序时，关键字this引用的都是携带相应行为的DOM元素
	//我们可以使用连缀的的方式简写上面的程序
	
	$('#switcher-large').on('click',function(){
		$('body').addClass('large').removeClass('narrow');
		
	});
    $('#switcher-default').addClass('selected').on('click',function(){
	  $('body').removeClass('narrow').removeClass('large');
	});
	
	$('#switcher-narrow').on('click',function(){
			$('body').addClass('narrow').removeClass('large');
	});

	$('#switcher button').on('click',function(){
			$('#switcher button').removeClass('selected');
			$(this).addClass('selected');
	});
	//1.通过对.on的一次调用为每个按钮都绑定相同的单击事件处理程序时，隐式迭代机制再次发生作用
	//2.行为队列机制允许在同一个单击事件是那个绑定了两个函数，而第二个函数不会覆盖第一个函数
	//最后使用连缀将每次添加和移除类的操作压缩到了一行代码中
	
   // 利用事件上下文进一步减少代码
	$('#switcher-large').on('click',function(){
		$('body').removeClass().addClass('large');
		
	});
    $('#switcher-default').addClass('selected').on('click',function(){
	  $('body').removeClass(); //removeClass可以移除DOM元素上所有类
	});
	
	$('#switcher-narrow').on('click',function(){
			$('body').removeClass().addClass('narrow');
	});

	$('#switcher button').on('click',function(){
			$('#switcher button').removeClass('selected');
			$(this).addClass('selected');
	});
	//需要注意的是，Jquery总是按照注册的顺序来触发事件处理程序
	//对上面的程序再提取共性，可以再优化
	
    $('#switcher-default').addClass('selected');
	$('#switcher button').on('click',function(){
		    $('body').removeClass();
			$('#switcher button').removeClass('selected');
			$(this).addClass('selected');
	});
	$('#switcher-narrow').on('click',function(){
		  $('body').addClass('narrow');
	});
     $('#switcher-large').on('click',function(){
		$('body').addClass('large');		
	});
	//最后因为，增加的类跟ID中后半段相同，完全可以通过this获取被单击按钮的ID
	//通过这个来消除特殊的处理程序，所以以上程序还可以被改造成
	$('#switcher-default').addClass('selected');
    $('#switcher button').on('click',function(){
		    var bodyClass = this.id.split('-')[1];
		    $('body').removeClass().addClass(bodyClass);
			$('#switcher button').removeClass('selected');
			$(this).addClass('selected');
	});
	
	//以上我们通过一系列的分析，对最初的代码进行了重构，使得代码更加优雅，容易维护,达到write less do more的效果
	//通过.on来绑定事件的方式，可以简写为使用.click()
    $('#switcher-default').addClass('selected');
    $('#switcher button').click(function(){
		    var bodyClass = this.id.split('-')[1];
		    $('body').removeClass().addClass(bodyClass);
			$('#switcher button').removeClass('selected');
			$(this).addClass('selected');
	});
	//最后我们认识下toggleClass方法，能够根据相应的类是否存在而添加或者删除类
	 $('#switcher h3').click(function(){
			$('#switcher button').toggleClass('hidden');
	});
});


//事件冒泡策略
$(document).ready(
function(){
	$('#test_sj').click(function(){
		alert('div');
	});
		$('#test_sj span').click(function(){
		alert('span');
	});
		$('#test_sj a').click(function(){
		alert('a');
	});
}
);
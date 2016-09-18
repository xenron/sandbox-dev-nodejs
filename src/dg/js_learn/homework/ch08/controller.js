/**
 * 
 */

//定义模块
var myAppModule = angular.module('myApp',[]);
myAppModule.controller('historyController',function($scope,$http){
	var url = '';
	/*$http.get(url).success(function(data,status,headers,config){
		$scope.historyList = data;
	})*/
	$scope.histroyList =[
	    {openDate:'20160921',firstBall:2,sencondBall:3,thirdBall:6,forthBall:16,fifthBall:17,sixBall:26,blueBall:8},
	    {openDate:'20160915',firstBall:4,sencondBall:5,thirdBall:9,forthBall:16,fifthBall:26,sixBall:31,blueBall:5},
	    {openDate:'20160913',firstBall:4,sencondBall:9,thirdBall:13,forthBall:18,fifthBall:20,sixBall:28,blueBall:10}
	   ];
   $scope.redList = [];
   for(var i = 0;i<33;i++){
	   $scope.redList[i] = i+1;
   };
   $scope.blueList = [];
   for(var i = 0;i<16;i++){
	   $scope.blueList[i] = i+1;
   };
   $scope.isSelected =function(num,item,type){
	   for(v in item){
		   if(type==='redBall'){
			   if(num == item[v]&&v!='blueBall'){
				   return true;
			   }
		   }else if(type==='blueBall'){
			   if(num == item[v]&&v=='blueBall'){
				   return true;
			   }   
		   }
		  
	   }
   };
   $scope.hello = function(name) {
        $scope.redList = [];
        $scope.blueList = [];
        if (name=="red") {
		    for(var i = 0;i<33;i++) {
		        $scope.redList[i] = i+1;
            };
        } else if (name=="blue") {
            for(var i = 0;i<16;i++){
	            $scope.blueList[i] = i+1;
            };
    }
   
});
myAppModule.controller('chooseController',function($scope){
	  $scope.balls = {};
	  $scope.next = 1;
	  $scope.whichBall = '';
	  $scope.isStart = false;
	  $scope.start =function(){
		  $scope.balls = {};
		  $scope.isStart = true ;
		  $scope.next =1;
		  $scope.whichBall = 'redBall'+ $scope.next;
		  $scope.next++;
	  };
	  function in_obj(value,obj){
		 for(v in obj){
			 if(obj[v]==value){
				 return true;
			 }
		 }
		 return false;
	  }
	  var calcBall = function(ball,maxValue,time){
		  $scope.balls[ball] = 0;
		  $scope.isReady = 0;
		  var updateball = function(){
			  var num = Math.floor(Math.random(0,1)*maxValue)+1;
			  if($scope.next<8&&!in_obj(num,$scope.balls)){
				  $scope.balls[ball] = num;
			  }else if($scope.next==8){
				  $scope.balls[ball] = num;
			  }
			  if($scope.isReady>=time){
					 clearInterval($scope.intval);
					 $scope.whichBall = 'redBall'+$scope.next;
					 if($scope.next==8){
						 $scope.isStart = false;
					 }
					 $scope.next++;
			  }
		  }
		  $scope.intval = setInterval(function(){
			 $scope.$apply(updateball);
			 $scope.isReady =$scope.isReady+100;
		  },100);
		  updateball();
	  }
	  function watchFn(newValue,oldValue,scope){
         if(newValue!=''){
        	 if(newValue.substring(7)<7){
        		 calcBall(newValue,33,2000);
        	 }else if (newValue.substring(7)==7){
        		 calcBall(newValue,16,2000);
        	 }
        	
         }
	  }
	  //deepWatch
	  $scope.$watch('whichBall',watchFn);
});

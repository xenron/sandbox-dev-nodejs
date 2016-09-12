/**
 * 
 */

//定义模块
var myAppModule = angular.module('myApp',[]);
myAppModule.controller('historyController',function($scope,$http){
	var url = '/MaWeb/data/data.txt';
	$http.get(url).success(function(data,status,headers,config){
		var dataArr = data.split('\n');
		$scope.histroyList = [];
		for(var i = 0;i<dataArr.length;i++){
			var ball = dataArr[i].split(',');
			var item = {};
			item['firstBall']=ball[0];
			item['sencondBall']=ball[1];
			item['thirdBall']=ball[2];
			item['fifthBall']=ball[3];
			item['fifthBall']=ball[4];
			item['sixBall']=ball[5];
			item['blueBall']=ball[6];
			$scope.histroyList[i]=item;
		}		
	});
	
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
   
});
myAppModule.controller('chooseController',function($scope,$interval){
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
				  $interval.cancel($scope.intval);
					 $scope.whichBall = 'redBall'+$scope.next;
					 if($scope.next==8){
						 $scope.isStart = false;
					 }
					 $scope.next++;
			  }
		  }
		  $scope.intval = $interval(function(){
			  updateball();
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

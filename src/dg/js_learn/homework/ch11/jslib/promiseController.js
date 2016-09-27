/**
 * 
 */

var app = angular.module('app',[]);
app.controller('promiseController',function($q,$http,$scope){
	
	var defer = $q.defer();
	var promise = defer.promise;
    $http({
	        method:'GET',
	        url:'source/ajax1.htm'
	    }).then(function(data){
	        defer.resolve(data)
	    },function(data){
	        defer.reject(data);
	    });
    promise.then(function(res){
    	$scope.testPromise = res.data;
    	return res.data+' I love my country';
    },function(res){
    	$scope.testPromise = res.statusText;
    	return 'error';
    }).then(function(data){
    	$scope.otherText = data ;
    },function(data){
    	$scope.otherText = data ;
    });
	
});
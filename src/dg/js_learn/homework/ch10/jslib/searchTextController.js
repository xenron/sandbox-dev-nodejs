/**
 * 
 */

var app = angular.module('app',[]);
app.controller('listController',function($scope){
	$scope.testBool = true ;
	$scope.names =  [{'name':'test1'},{'name':'test2'}];
});
app.filter('truncate', function() {
	  return function(input,length) {
	    return (input.length > length ? input.substring(0, length) : input );
	  };
});

app.service('maservice',function(){
	this.add = function(a,b){
		return a+b;
	};
});

app.directive('customColor', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, elem, attrs) {
	      elem.css({'background-color': attrs.customColor});
	    }
	  };
});

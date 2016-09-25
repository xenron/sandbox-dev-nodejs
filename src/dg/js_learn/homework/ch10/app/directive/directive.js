var app = angular.module('myAppDirective',[]);

app.directive('classDirective',function(){
	return function(scope, element) {
		element.addClass("plain");
	}
});
app.directive('clickDirective',function(){
	return {
		scope:{},
		link:linkFn
	}
	function linkFn(scope, element) {
		element.bind("click", function() {
			scope.clicked=true;
		})
	}
});
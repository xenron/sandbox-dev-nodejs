var app = angular.module('appDirectiveNsTextAndSub', []);

app.directive('nsTextAndSub', function () {
	return {
		restrict: 'E',
		templateUrl: 'directive/text-and-sub-directive.html',
		scope: {
			text: "@",
			sub: "@",
		},
		link: function (scope, element, attrs) {
		}
	}
});
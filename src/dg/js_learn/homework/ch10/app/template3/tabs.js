var tabs = angular.module('notepad', []);

tabs.directive('tabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'template3/tabs.html',
    replace: true
  };
});

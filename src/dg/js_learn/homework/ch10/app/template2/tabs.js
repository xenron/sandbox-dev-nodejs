var tabs = angular.module('notepad', []);

tabs.directive('tabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'template2/tabs.html',
    replace: true
  };
});

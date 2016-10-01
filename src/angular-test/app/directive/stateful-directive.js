var app = angular.module('appDirectiveNsStateful', []);

app.directive('nsStateful', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            if (!attrs.nsStateful) {
                throw "You must provide a class name in order to use the nsStateful directive.";
            }
            element.bind('click', function (e) {
                scope.$apply(function () {
                    if (!element.hasClass(attrs.nsStateful)) {
                        element.addClass(attrs.nsStateful);
                    } else {
                        element.removeClass(attrs.nsStateful);
                    }
                });
            });
        }
    }
});
'use strict';

var app = angular.module('appController', []);

app.controller('PieController', [$scope, function ($scope) {
    $scope.eatSilce = function () {
        if ($scope.slices) {
            $scope.silces--;
        }
    };
    $scope.silces = 8;
}]);

app.controller('PasswordController', function PasswordController($scope) {
    $scope.password = '';
    $scope.grade = function () {
        var size = $scope.password.length;
        if (size > 8) {
            $scope.strength = 'strong';
        } else if (size > 3) {
            $scope.strength = 'medium';
        } else {
            $scope.strength = 'weak';
        }
    };
});

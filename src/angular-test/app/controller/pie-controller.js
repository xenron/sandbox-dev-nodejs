'use strict';

var app = angular.module('appPieController', []);

app.controller('PieController', [$scope, function ($scope) {
    $scope.eatSilce = function () {
        if ($scope.slices) {
            $scope.silces--;
        }
    };
    $scope.silces = 8;
}]);

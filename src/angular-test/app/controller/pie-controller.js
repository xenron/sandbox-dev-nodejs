'use strict';

var app = angular.module('appController', []);

app.controller('PieController',
    ['$scope', function ($scope) {
        $scope.eatSilce = function () {
            if ($scope.slices) {
                $scope.slices--;
            }
        };
        $scope.slices = 8;
    }]);

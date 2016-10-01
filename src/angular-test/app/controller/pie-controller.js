'use strict';

var app = angular.module('appController', []);

app.controller('PieController',
    ['$scope',
        function ($scope) {
            $scope.eatSilce = function () {
                if ($scope.slices) {
                    $scope.slices--;
                }
            };

            this.requestFlavor = function (flavor) {
                $scope.lastRequestedFlavor = flavor;
            }

            $scope.slices = 8;
            $scope.lastRequestedFlavor;
    }]);

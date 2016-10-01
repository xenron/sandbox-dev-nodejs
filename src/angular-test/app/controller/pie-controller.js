'use strict';

var app = angular.module('appController', []);

app.controller('PieController',
    ['$scope',
        function ($scope) {

            $scope.slices = 8;
            $scope.lastRequestedFlavor;

            $scope.eatSilce = function () {
                if ($scope.slices) {
                    $scope.slices--;
                }
            };

            this.requestFlavor = function (flavor) {
                $scope.lastRequestedFlavor = flavor;
            }


    }]);

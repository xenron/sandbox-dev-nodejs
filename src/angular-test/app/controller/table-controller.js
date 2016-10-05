'use strict';

var app = angular.module('appController', []);

app.controller('TableController',
    ['$scope',
        function ($scope) {
            $scope.pies = null;
    }]);

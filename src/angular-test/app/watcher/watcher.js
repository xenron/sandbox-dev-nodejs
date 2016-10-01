'use strict';

var app = angular.module('appWatcher', []);

app.controller('PieController',
    ['$scope',
        function ($scope) {

            // Watchers
            function compareAndWarn(newVal, oldVal) {
                var props = [];
                if (newVal && oldVal) {
                    for (var key in newVal) {
                        if (newVal[key] > oldVal[key]) {
                            props.push(key.charAt(0).toUpperCase() + key.slice(1));
                        }
                    }
                }
                return props;
            }

            $scope.$watch('nutritionalValue', function (newVal, oldVal) {
                var props = compareAndWarn(newVal, oldVal);
                if (props && props.length) {
                    $scope.warning = props.join(",") + " have gone up!";
                } else {
                    $scope.warning = null;
                }
            }, true);

            $scope.slices = 8;
            $scope.lastRequestedFlavor;
            $scope.warning = null;
            $scope.nutritionalValue = {calories: 500, fat:200, carbs:100};

            // Action Handlers
            $scope.eatSilce = function () {
                if ($scope.slices) {
                    $scope.slices--;
                }
            };

            this.requestFlavor = function (flavor) {
                $scope.lastRequestedFlavor = flavor;
            }


        }]);

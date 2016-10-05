'use strict';

var app = angular.module('appSpy', []);

app.factory('DessertManager',
    function () {
        return {
            mode: function (param) {
                return "test";
            }
        };
    }
);

app.controller('PieController',
    ['$scope', 'DessertManager',
        function ($scope, dessertManager) {

            $scope.toggleMode = function () {
                if (dessertManager.mode() === 'pie') {
                    dessertManager.mode("cake");
                } else {
                    dessertManager.mode("pie");
                }
            };

        }
    ]
);

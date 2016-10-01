'use strict';

var app = angular.module('appFactory', []);

app.value('DessertValues', {
    pies: [
        {flavor: "Cherry", score: 6},
        {flavor: "Apple", score: 7.5},
        {flavor: "Peach", score: 4}
    ]
})

app.factory('DessertManager',
    ['DessertValues',
        function (dessertValues) {
            return {
                pieFavors: function () {
                    return dessertValues.pies.map(function (pie) {
                        return pie.flavor;
                    })
                }
            };
        }
    ]
);

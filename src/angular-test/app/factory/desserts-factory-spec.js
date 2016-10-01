'use strict';

describe('appFactory module', function () {

    var values;
    var factory;

    beforeEach(function () {
        module('appFactory');
        inject(function (_$injector_) {
            values = _$injector_.get('DessertValues');
            factory = _$injector_.get('DessertManager');
        });
    });

    describe('DessertValues', function () {
        it('Should instantiate with 3 pie flavors', function () {
            expect(values.pies).toEqual(
                [
                    {flavor: "Cherry", score: 6},
                    {flavor: "Apple", score: 7.5},
                    {flavor: "Peach", score: 4}
                ]
            );
        });
    });

    describe('DessertManager', function () {
        describe('pieFlavors', function () {
            it('Should return the 3 pie flavor string', function () {
                var flavors = factory.pieFavors();
                expect(flavors.length).toEqual(3);
                expect(flavors[0]).toEqual("Cherry");
                expect(flavors[1]).toEqual("Apple");
                expect(flavors[2]).toEqual("Peach");
            });
            it('Should throw an error if there are no pies', function () {
                values.pies = null;
                expect(function () {
                    factory.pieFavors();
                }).toThrow();
                values.pies = [
                    {flavor: "Cherry", score: 6},
                    {flavor: "Apple", score: 7.5},
                    {flavor: "Peach", score: 4}
                ];
            });
        });
    });


});
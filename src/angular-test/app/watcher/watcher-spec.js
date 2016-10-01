'use strict';

describe('appWatcher module', function () {

    var $controller;
    var $rootScope;
    var $scope;

    beforeEach(function () {
        module('appWatcher');
        inject(function (_$injector_) {
            $rootScope = _$injector_.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = _$injector_.get('$controller')('PieController', {$scope: $scope});
        });
    });

    describe('Initialization', function () {
        it('Should instantiate slices to 8', function () {
            expect($scope.slices).toEqual(8);
        });
        it('Should instantiate $scope.lastRequestedFlavor', function () {
            expect($scope.lastRequestedFlavor).toBeUndefined();
        });
        it('Should instantiate nutritionalValue to its default', function () {
            expect($scope.nutritionalValue).toEqual(
                {calories: 500, fat:200, carbs:100}
            );
        });
        it('Should instantiate warning to null', function () {
            expect($scope.warning).toBeNull();
        });
    });

    describe('Watchers', function () {
        beforeEach(function () {
            $scope.$digest();
        });
        describe('Initialization', function () {
            it('Should set the warning that Carbs have gone up, when only carbs go up', function () {
                $scope.nutritionalValue.carbs++;
                $scope.$digest();
                expect($scope.warning).toEqual("Carbs have gone up!");
            });
            it('Should set the warning that fat have gone up, when only fat go up', function () {
                $scope.nutritionalValue.fat++;
                $scope.$digest();
                expect($scope.warning).toEqual("Fat have gone up!");
            });
            it('Should set the warning that calories have gone up, when only calories go up', function () {
                $scope.nutritionalValue.calories++;
                $scope.$digest();
                expect($scope.warning).toEqual("Calories have gone up!");
            });
            it('Should set the warning that a combination have gone up, when only carbs go up', function () {
                $scope.nutritionalValue.carbs++;
                $scope.nutritionalValue.calories++;
                $scope.nutritionalValue.fat++;
                $scope.$digest();
                expect($scope.warning).toEqual("Calories,Fat,Carbs have gone up!");
            });
            it('Should set the warning to null if nothing go up', function () {
                expect($scope.warning).toBeNull();
            });
            it('Should set the warning to null if nothing has gone up, even if some things have gone do', function () {
                $scope.nutritionalValue.carbs--;
                $scope.nutritionalValue.calories--;
                $scope.nutritionalValue.fat--;
                $scope.$digest();
                expect($scope.warning).toBeNull();
            });
        });
    });

    // describe('Watchers', function () {
    //     it('Should instantiate slices to 8', function () {
    //         expect($scope.slices).toEqual(8);
    //     });
    //     it('Should instantiate $scope.lastRequestedFlavor', function () {
    //         expect($scope.lastRequestedFlavor).toBeUndefined();
    //     });
    // });

    // describe('Action Handlers', function () {
    //     describe('eatSlice', function () {
    //         it('Should decrement the number of slices', function () {
    //             expect($scope.slices).toEqual(8);
    //             $scope.eatSilce();
    //             expect($scope.slices).toEqual(7);
    //         });
    //         it('Should do nothing when slices is 0', function () {
    //             expect($scope.slices).toEqual(8);
    //             $scope.slices = 0;
    //             expect($scope.slices).toEqual(0);
    //             $scope.eatSilce();
    //             expect($scope.slices).toEqual(0);
    //         });
    //     });
    //     describe('requestedFlavor', function () {
    //         it('Should set $scope.lastRequestedFlavor to the passed in argument', function () {
    //             expect($scope.lastRequestedFlavor).toBeUndefined();
    //             $controller.requestFlavor("Cherry");
    //             expect($scope.lastRequestedFlavor).toEqual("Cherry");
    //         });
    //
    //     });
    // });


});
'use strict';

describe('appPieController module', function () {

    var $controller;
    var $rootScope;
    var $scope;

    beforeEach(function() {
        module('appController');
        // inject(function (_$controller_) {
        //     // The injector unwraps the underscores (_) from around the parameter names when matching
        //     $controller = _$controller_;
        // });
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
    });

    describe('Action Handlers', function () {
        describe('eatSlice', function () {
            it('Should decrement the number of slices', function () {
                expect($scope.slices).toEqual(8);
                $scope.eatSilce();
                expect($scope.slices).toEqual(7);
            });
            it('Should do nothing when slices is 0', function () {
                expect($scope.slices).toEqual(8);
                $scope.slices = 0;
                expect($scope.slices).toEqual(0);
                $scope.eatSilce();
                expect($scope.slices).toEqual(0);
            });
        });
        describe('requestedFlavor', function () {
            it('Should set $scope.lastRequestedFlavor to the passed in argument', function () {
                expect($scope.lastRequestedFlavor).toBeUndefined();
                $controller.requestFlavor("Cherry");
                expect($scope.lastRequestedFlavor).toEqual("Cherry");
            });

        });
    });


});
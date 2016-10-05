'use strict';

describe('appPieController module', function () {

    var $controller;
    var $rootScope;
    var $scope;
    var dessertManager;

    beforeEach(function() {
        module('appSpy');
        inject(function (_$injector_) {
            $rootScope = _$injector_.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = _$injector_.get('$controller')('PieController', {$scope: $scope});
            dessertManager = _$injector_.get('DessertManager');
        });
    });

    describe('toggleMode', function () {
        var modeSpy;
        beforeEach(function () {
            modeSpy = spyOn(dessertManager, 'mode');
                //.and.returnValue("pie");
            // spyOn(searchService, 'search').and.returnValue(searchServiceDeferred.promise);
        })
        it('Should switch the mode to cake whenever the mode is equal to pie', function () {
            modeSpy = modeSpy.and.returnValue("pie");
            $scope.toggleMode();
            expect(modeSpy).toHaveBeenCalledWith("cake");
        });
        it('Should switch the mode to pie if the mode is anything other than pie', function () {
            modeSpy = modeSpy.and.returnValue("cupcake");
            $scope.toggleMode();
            expect(modeSpy).toHaveBeenCalledWith("pie");
        });
    });


});
'use strict';

describe('appPieController module', function () {

    var $controller;
    var $rootScope;
    var $scope;

    beforeEach(function() {
        module('appPieController');
        // inject(function (_$controller_) {
        //     // The injector unwraps the underscores (_) from around the parameter names when matching
        //     $controller = _$controller_;
        // });
        inject(function (_$injector_) {
            $rootScope = _$injector_.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = _$injector_.get('$controller')('appPieController', {$scope: $scope});
        });
    });


    it('should be defined ...', inject(function (_$controller_) {
        //spec body
        var view1Ctrl = _$controller_('myAppControllerCtrl01');
        expect(view1Ctrl).toBeDefined();
    }));

    describe('myAppController controller', function () {
        it('should be defined ....', inject(function (_$controller_) {
            //spec body
            var view1Ctrl = _$controller_('myAppControllerCtrl01');
            expect(view1Ctrl).toBeDefined();
        }));
    });

    describe('$scope.grade', function () {

        it('sets the strength to "strong" if the password length is >8 chars', function () {
            var $scope = {};
            var controller = $controller('PasswordController', {$scope: $scope});
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });

        it('sets the strength to "weak" if the password length <3 chars', function () {
            var $scope = {};
            var controller = $controller('PasswordController', {$scope: $scope});
            $scope.password = 'a';
            $scope.grade();
            expect($scope.strength).toEqual('weak');
        });

    });

    describe('$scope.grade', function () {

        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('PasswordController', {$scope: $scope});
        });

        it('sets the strength to "strong" if the password length is >8 chars', function () {
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });

        it('sets the strength to "weak" if the password length <3 chars', function () {
            $scope.password = 'a';
            $scope.grade();
            expect($scope.strength).toEqual('weak');
        });
    });


});
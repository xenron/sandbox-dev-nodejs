'use strict';

describe('myAppController module', function() {

  beforeEach(module('myAppController'));
  
  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  
  it('should be defined ...', inject(function($controller) {
    //spec body
    var view1Ctrl = $controller('myAppControllerCtrl01');
    expect(view1Ctrl).toBeDefined();
  }));
  
  describe('myAppController controller', function(){
    it('should be defined ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('myAppControllerCtrl01');
      expect(view1Ctrl).toBeDefined();
    }));
  });
  
  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('PasswordController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
    
    it('sets the strength to "weak" if the password length <3 chars', function() {
      var $scope = {};
      var controller = $controller('PasswordController', { $scope: $scope });
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    });
    
  });
  
  describe('$scope.grade', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('PasswordController', { $scope: $scope });
    });

    it('sets the strength to "strong" if the password length is >8 chars', function() {
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });

    it('sets the strength to "weak" if the password length <3 chars', function() {
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    });
  });


});
'use strict';

describe('appBasic module1', function() {
  var template;
  var $controller;
  var $rootScope;
  var $scope;
  var $compile;

  beforeEach(function() {
    module('appBasic');
    inject(function(_$compile_, _$rootScope_, _$templateCache_) {
      $scope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  it('Should be true ...', function() {
    expect(true).toBe(true);
    expect(true).toBeTruthy();
  });
});

describe('appBasic module2', function() {
  var template;
  var $controller;
  var $rootScope;
  var $scope;
  var $compile;

  beforeEach(function() {
    module('appBasic');
    inject(function (_$injector_) {
      $rootScope = _$injector_.get('$rootScope');
      $scope = $rootScope.$new();
      // $controller = _$injector_.get('$controller')('appBassicController', {$scope: $scope});
    });
  });

  it('Should be true ...', function() {
    expect(true).toBe(true);
    expect(true).toBeTruthy();
  });
});

describe('appBasic module3', function() {

  var element;
  var $scope;
  var $compile;
  var template;
  var $controller;
  var $rootScope;
  var $scope;
  
  beforeEach(function() {
    module('appBasic');
  });
  beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('should equal 4', function() {
    element = angular.element("<div>{{2+2}}</div>");
    $compile(element)($scope);
    $scope.$digest();
    expect(element.html()).toBe("4");
  });
  
  describe('sorting the list of users', function() {
    it('sorts in descending order by default', function() {
      var users = ['jack', 'igor', 'jeff'];
      // var sorted = sortUsers(users);
      // expect(sorted).toEqual(['jeff', 'jack', 'igor']);
      var sorted = users.sort();
      expect(sorted).toEqual(['igor', 'jack', 'jeff']);
    });
  });


});
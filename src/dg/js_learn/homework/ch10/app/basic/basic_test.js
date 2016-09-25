'use strict';

describe('myAppBasic module', function() {

  var element1;
  var $_scope;
  var $_compile;
  var template;
  beforeEach(function() {
    module('myAppBasic');
  });
  beforeEach(inject(function($compile, $rootScope, $templateCache) {
    $_scope = $rootScope;
    $_compile = $compile;
  }));

  it('dummy test ...', function() {
    expect(true).toBe(true);
  });

  it('should equal 4', function() {
    element = angular.element("<div eh-simple1>{{2+2}}</div>");
    $_compile(element)($_scope);
    $_scope.$digest();
    expect(element.html()).toBe("4");
  });
  
  // describe('view1 controller', function(){
  //   it('should ....', inject(function($controller) {
  //     expect(true).toBe(true);
  //   }));

  //   it("should equal 4 -inner", function() {
  //     $scope.$digest();
  //     expect(element1.html()).toBe("4");
  //   });
  //   it("should add a class of plain", function() {
  //     $scope.$digest();
  //     expect(element2.hasClass("plain")).toBe(true);
  //   });
  //   it("should respond to a click", function() {
  //     element3.triggerHandler('click');
  //     // expect(element3.scope().clicked).toBe(true);
  //     expect(true).toBe(true);
  //   });

  // });

});
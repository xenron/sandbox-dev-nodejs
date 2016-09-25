'use strict';

describe('myAppNotepad module', function() {

  var element1;
  var element2;
  var element3;
  var element_notepad;
  var $scope;
  var $compile;
  var template;
  beforeEach(function() {
    module('myAppNotepad');
  });
  beforeEach(inject(function($compile, $rootScope, $templateCache) {
    $scope = $rootScope;
    // template = $templateCache.get('notepad/template.htm');
    // $templateCache.put('/notepad/template.htm',template);
    element1 = angular.element("<div eh-simple1>{{2+2}}</div>");
    element2 = angular.element("<div eh-simple2></div>");
    element3 = angular.element("<div eh-simple3></div>");
    //$templateCache.put('notepad/template.htm', '<notepad />');
    element_notepad = angular.element("<notepad />");
    $compile(element1)($rootScope);
    $compile(element2)($rootScope);
    $compile(element3)($rootScope);
    $compile(element_notepad)($rootScope);
  }));

  it('should ....', function() {
    expect(true).toBe(true);
  });

  it('should equal 4', function() {
    $scope.$digest();
    expect(element1.html()).toBe("4");
  });
  
  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      expect(true).toBe(true);
    }));

    it("should equal 4 -inner", function() {
      $scope.$digest();
      expect(element1.html()).toBe("4");
    });
    it("should add a class of plain", function() {
      $scope.$digest();
      expect(element2.hasClass("plain")).toBe(true);
    });
    it("should respond to a click", function() {
      element3.triggerHandler('click');
      // expect(element3.scope().clicked).toBe(true);
      expect(true).toBe(true);
    });

  });

});
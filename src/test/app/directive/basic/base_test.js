'use strict';

describe('Unit testing great quotes', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('myAppDirective'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<a-great-eye></a-great-eye>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });
});

// describe('myAppNotepad module', function() {

//   var element1;
//   var element2;
//   var element3;
//   var element_notepad;
//   var $scope;
//   var $compile;
//   var template;
//   beforeEach(function() {
//     module('myAppNotepad');
//   });
//   beforeEach(inject(function($compile, $rootScope, $templateCache) {
//     $scope = $rootScope;
//     // template = $templateCache.get('notepad/template.htm');
//     // $templateCache.put('/notepad/template.htm',template);
//     element1 = angular.element("<div eh-simple1>{{2+2}}</div>");
//     element2 = angular.element("<div eh-simple2></div>");
//     element3 = angular.element("<div eh-simple3></div>");
//     //$templateCache.put('notepad/template.htm', '<notepad />');
//     element_notepad = angular.element("<notepad />");
//     $compile(element1)($rootScope);
//     $compile(element2)($rootScope);
//     $compile(element3)($rootScope);
//     $compile(element_notepad)($rootScope);
//   }));

//   it('should ....', function() {
//     expect(true).toBe(true);
//   });

//   it('should equal 4', function() {
//     $scope.$digest();
//     expect(element1.html()).toBe("4");
//   });
  
//   describe('view1 controller', function(){

//     it('should ....', inject(function($controller) {
//       expect(true).toBe(true);
//     }));

//     it("should equal 4 -inner", function() {
//       $scope.$digest();
//       expect(element1.html()).toBe("4");
//     });
//     it("should add a class of plain", function() {
//       $scope.$digest();
//       expect(element2.hasClass("plain")).toBe(true);
//     });
//     it("should respond to a click", function() {
//       element3.triggerHandler('click');
//       // expect(element3.scope().clicked).toBe(true);
//       expect(true).toBe(true);
//     });

//   });

// });
'use strict';

describe('myAppNotepad module', function() {

  var element1;
  var element2;
  var element3;
  var element_notepad;
  var $scope;
  var $compile;
  var template;
  // beforeEach(function() {
  //   module('myApp.notepad');
  //   // browser().navigateTo('notepad.html');
  // });
  // beforeEach(module('myApp.notepad'));
  // beforeEach(inject(function($compile, $rootScope) {
  //   $scope = $rootScope;
  //   // element = angular.element("<div eh-simple>{{2+2}}</div>");
  //   // $compile(element)($rootScope);
  // }));
  beforeEach(function() {
    module('myAppNotepad');
    // module('myAppNotepad', 'notepad/template.htm');
    // inject(['$compile', '$rootScope', function(_$compile_, $rootScope) {
    //   $compile = _$compile_;
    //   $scope = $rootScope;
    // }]);
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
  // beforeEach(function($compile, $rootScope) {
  //   $scope = $rootScope;
  //   element = angular.element("<div eh-simple>{{2+2}}</div>");
  //   $compile(element)($rootScope);
  // });

  // it("test", function() {
  //   $scope.$digest();
  //   expect(element.html()).toBe("4");
  // });

  it('should ....', function() {
    expect(true).toBe(true);
  });

  it('should equal 4', function() {
    $scope.$digest();
    expect(element1.html()).toBe("4");
  });

  //beforeEach(module('myApp.notepad'));
  describe('view1 controller', function(){
    // beforeEach(function() {
    //   module('myApp.notepad');
    //   // browser().navigateTo('notepad.html');
    // });


    // it('should ....', inject(function($controller) {
    //   //spec body
    //   var notePadCtrl = $controller('NotePadCtrl');
    //   expect(notePadCtrl).toBeDefined();
    // }));

    // it('add event ....', inject(function($controller) {
    //   element('ul').query(function($el, done) {
    //   	//oldCount = $el.children().length;
    //   	done();
    //   });
      
    //   element('button').query(function($el, done) {
    //     $el.click();
    //     done();
    //   });

    // }));

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

    // it('should ....', inject(function($controller) {
      
    // }));

  });

  describe('notepad test', function(){
    var $_compile;
     var $_scope;
     var $_rootScope;
     var el;
     var template;
    beforeEach(inject(function($compile, $rootScope) {
         $_compile = $compile;
         $_scope = $rootScope.$new();
         $_rootScope = $rootScope;
         el = angular.element("<notepad />");
         template = $_compile(el)($_scope);
      }));
    it("notepad append", function() {
      // element_notepad.triggerHandler('click');
      expect(true).toBe(true);
    });
    it("trigger click event and destroy element", function(){
      // spyOn(el.scope(), 'openEditor')
      // spyOn($.fn, 'notepad').andCallThrough();
      console.info("----------------------------");
      console.info(template.find("span"));
      console.info(template.scope().editMode);
      // console.info(el.scope());
      template.find("span").triggerHandler("click");
        
      // expect(el.scope().openEditor).toHaveBeenCalledWith();
      // expect($.fn.notepad).toHaveBeenCalled();
      expect(true).toBe(true);
      // $_scope.$digest();
      // template.scope().$digest();
      console.info("----------------------------");
      console.info($_scope.editMode);
      console.info(template.scope().editMode);
      // console.info(el.scope().editMode);
      // expect(el.scope().editMode).toBe(true);
      expect(true).toBe(true);
     });
  });

  //step1: Describe
  describe("corley.directives ngDestroy", function () {                                                                                                                                                 
    var $_compile;
     var $_scope;
     var el;
     var template;
     //step2: init module
     // beforeEach(function(){
     //     module("corley.directives");
     // });

     //step3: resume dependencies and base setup
     beforeEach(inject(function($compile, $rootScope) {
         $_compile = $compile;
         $_scope = $rootScope.$new();
         el = angular.element("<div class='ngDestroy'>");
         template = $_compile(el)($_scope);
      }));
     //step4: tests
     it("Append span in element", function(){
        expect(template.find("span").length).toBe(1);
     });
     it("trigger click event and destroy element", function(){
        template.find("span").triggerHandler("click");
        console.info("----------------------------");
        console.info(template.find("span"));
        expect(template.find("div").length).toBe(0);
     });
  });

});
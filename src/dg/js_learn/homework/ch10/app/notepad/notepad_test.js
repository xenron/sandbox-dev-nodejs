'use strict';

describe('myAppNotepad module', function() {

  var element1;
  var element2;
  var element3;
  var element_notepad;
  var $scope;
  var $compile;
  var template;
  
  var elm, scope;

  // load the tabs code
  beforeEach(module('myAppNotepad'));

  // load the templates
  beforeEach(module('notepad/tpl/template.html'));

  // beforeEach(inject(function($rootScope, $compile) {
  //   // we might move this tpl into an html file as well...
  //   elm = angular.element('<notepad />');

  //   scope = $rootScope;
  //   $compile(elm)(scope);
  //   scope.$digest();
  // }));

  it('should ....', function() {
    expect(true).toBe(true);
  });

});
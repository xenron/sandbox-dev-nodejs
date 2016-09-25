'use strict';

describe('myAppBasic module', function() {

  var element;
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
    element = angular.element("<div>{{2+2}}</div>");
    $_compile(element)($_scope);
    $_scope.$digest();
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
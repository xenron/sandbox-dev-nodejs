/**
 * 
 */

describe('test search ctr',function(){
	beforeEach(function(){
		browser().navigateTo('/notePad.html');
	});
	it('should filter result',function(){
	   input('query').enter('test');
	   expect(repeater('ul li').count()).toBe(2);
	   input('query').enter('test1');
	   expect(repeater('ul li').count()).toBe(1);
	   input('query').enter('test2');
	   expect(repeater('ul li').count()).toBe(1);
	   
	   input('query').enter('sss');
	   expect(repeater('ul li').count()).toBe(0);
  });
});

describe('directive tests', function() {
  
   	  var $httpBackend;
  beforeEach(angular.mock.module('app'));
  
  it('should not empty',	      
  angular.mock.inject(function($compile,$rootScope,$injector) {
  $httpBackend = $injector.get('$httpBackend');
  $httpBackend.whenGET('/TestAngular/template/notepad.htm').respond(200, '');	  
  scope = $rootScope.$new();	   
  elem = angular.element("<notepad> </notepad>");	   
  var directiveElem = $compile(elem)(scope);
  scope.$digest();
  console.log(directiveElem);	   
  console.log(directiveElem.html());	   
  expect(directiveElem.html()).not.toEqual('');
  //expect(directiveElem.find('span')).toBe(2);
     })
  );
});
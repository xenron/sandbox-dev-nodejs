/**
 * 
 
describe('my first test',function(){
	it('this is specs ',function(){
		
		expect(true).toBe(true);
		expect(false).toBe(false);
	});
	var v;
	it('this is specs2',function(){
		v =true;
		expect(v).toBe(true);
		expect(v).not.toBe(false);
	});
	it('this is specs3',function(){
		v = 3;
		expect(v).toEqual(3);
	})


});
*/
describe('this is karma jsmine test',function(){
	//测试controller
	describe('test controller',function(){
		var scope ;
		beforeEach(angular.mock.module('app'));
		beforeEach(angular.mock.inject(function($rootScope,$controller){
			scope = $rootScope.$new();
	        $controller('listController', {$scope: scope});
		}));
		it('test list controller',function(){
			 expect(scope.testBool).toBe(true);
		});
	});
   //测试过滤器
	describe('test filter',function(){
	   var fn  ;
		beforeEach(angular.mock.module('app'));
	    beforeEach(angular.mock.inject(function(truncateFilter){
			fn = truncateFilter;
		}));
		it('trunckate filter test',function(){
			      expect(fn('abcdefghijkl', 10).length).toBe(10);
		})
	});
	
	 //测试服务
	describe('test service',function(){
	   var service  ;
		beforeEach(angular.mock.module('app'));
	    beforeEach(angular.mock.inject(function(maservice){
	    	service = maservice;
		}));
		it('maservice  test',function(){
			      expect(service.add(3,5)).toBe(8);
		})
	});
	
	describe('directive tests', function() {
	    beforeEach(angular.mock.module('app'));
	  it('should set background to rgb(128, 128, 128)',
	     angular.mock.inject(function($compile,$rootScope) {
	      scope = $rootScope.$new();
	      elem = angular.element("<span custom-color=\"rgb(128, 128, 128)\">sample</span>");
	      scope = $rootScope.$new();
	      $compile(elem)(scope);
	      expect(elem.css("background-color")).toEqual('rgb(128, 128, 128)');
	     })
	  );
	});
	
});

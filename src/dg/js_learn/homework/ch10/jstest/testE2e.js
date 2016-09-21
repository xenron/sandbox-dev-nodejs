/**
 * 
 */

describe('test search ctr',function(){
	beforeEach(function(){
		browser().navigateTo('/searchText.html');
	});
	it('should filter result',function(){
	   input('query').enter('test1');
	   expect(repeater('ul li').count()).toBe(1);
	   input('query').enter('sss');
	   expect(repeater('ul li').count()).toBe(1);
  });
		
});
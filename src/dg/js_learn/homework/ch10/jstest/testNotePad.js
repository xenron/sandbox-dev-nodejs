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

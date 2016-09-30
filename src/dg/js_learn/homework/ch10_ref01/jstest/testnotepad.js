/**
 * 
 */

describe('test notepad ',function(){
	beforeEach(function(){
		browser().navigateTo('/TestAngular/angular/notePad.jsp');
	});
	it('should add note',function(){
		element('span a:contains("Add Note")').click();
		sleep(3);
		input('noteText').enter('test data');
		sleep(3);
		element('span a:contains("back")').click();
		sleep(3);
		//expect(element('ul li').count()).toBe(1);
  });
		
});

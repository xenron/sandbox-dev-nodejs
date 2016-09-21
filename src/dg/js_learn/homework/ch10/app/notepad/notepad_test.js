'use strict';

describe('myApp.view1 module', function() {

  //beforeEach(module('myApp.notepad'));
  beforeEach(function() {
  	module('myApp.notepad');
    browser().navigateTo('notepad.html');
  });

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var notePadCtrl = $controller('NotePadCtrl');
      expect(notePadCtrl).toBeDefined();
    }));

    it('add event ....', inject(function($controller) {
      element('ul').query(function($el, done) {
      	//oldCount = $el.children().length;
      	done();
      });
      
      element('button').query(function($el, done) {
        $el.click();
        done();
      });

    }));

    it('should ....', inject(function($controller) {
      
    }));

    it('should ....', inject(function($controller) {
      
    }));

  });
});
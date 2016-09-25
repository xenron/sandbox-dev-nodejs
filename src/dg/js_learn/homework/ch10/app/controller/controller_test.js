'use strict';

describe('myAppController module', function() {

  beforeEach(module('myAppController'));
  
  it('should be defined ....', inject(function($controller) {
    //spec body
    var view1Ctrl = $controller('myAppControllerCtrl01');
    expect(view1Ctrl).toBeDefined();
  }));

});
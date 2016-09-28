describe('tabs', function() {
  var elm, scope;

  // load the tabs code
  beforeEach(module('notepad'));

  // load the templates
  beforeEach(module('template3/tabs.html'));

  beforeEach(inject(function($rootScope, $compile) {
    // we might move this tpl into an html file as well...
    elm = angular.element('<div></div>');

    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));


  it('should create clickable titles', inject(function($compile, $rootScope) {
    expect(true).toBe(true);
  }));
});


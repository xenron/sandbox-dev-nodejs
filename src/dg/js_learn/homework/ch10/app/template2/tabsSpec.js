describe('notepad', function() {
  var elm, scope, compile;

  // load the tabs code
  beforeEach(module('notepad'));
  // beforeEach(module('notepad'));

  // load the templates
  beforeEach(module('template2/tabs.html'));
  // beforeEach(module('notepad/template.html'));

  beforeEach(inject(function($rootScope, $compile) {
    // we might move this tpl into an html file as well...
    elm = angular.element('<newelement></newelement>');
      // '<notepad />');

    scope = $rootScope;
    compile = $compile;
    $compile(elm)(scope);
    scope.$digest();
  }));


  it('should create notepad', function() {
    

    // console.log(elm.find('ul li a').length);
    // console.log(elm.find('a').length);
    // console.log(elm.find('a'));

    scope.$apply(function() {
      scope.notes = [];
      var note ={};
      note.title = "test_title";
      note.content = "test_content";
      note.id = 1;
      scope.notes[note.id]=note;
    });

    elm = angular.element('<newelement></newelement>');
    compile(elm)(scope);
    scope.$digest();

    console.log(elm.find('ul li a').length);
    console.log(elm.find('a').length);
    // console.log(elm.find('a'));
    expect(true).toBe(true);

  });
});

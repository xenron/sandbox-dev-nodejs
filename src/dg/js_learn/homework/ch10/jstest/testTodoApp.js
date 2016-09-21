describe('TodoController Test', function() {
  beforeEach(module('todoApp')); // will be run before each it() function

  // we don't need the real factory here. so, we will use a fake one.
  var mockService = {
    notes: ['note1', 'note2'], //just two elements initially
    get: function() {
      return this.notes;
    },
    put: function(content) {
      this.notes.push(content);
    }
  };

  // now the real thing: test spec
  it('should return notes array with two elements initially and then add one',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // while creating the controller we have to inject the dependencies too.
      var ctrl = $controller('TodoController', {$scope: scope, notesFactory:mockService});

      // the initial count should be two
      expect(scope.notes.length).toBe(2);

      // enter a new note (Just like typing something into text box)
      scope.note = 'test3';

      // now run the function that adds a new note (the result of hitting the button in HTML)
      scope.createNote();

      // expect the count of notes to have been increased by one!
      expect(scope.notes.length).toBe(3);
    })
  );
});

describe('notesFactory tests', function() {
  var factory;

  // excuted before each "it()" is run.
  beforeEach(function() {
    // load the module
    module('todoApp');

    // inject your factory for testing
    inject(function(notesFactory) {
      factory = notesFactory;
    });

    var store = {
      todo1: 'test1',
      todo2: 'test2',
      todo3: 'test3'
    };

    spyOn(localStorage, 'getItem').andCallFake(function(key) {
      return store[key];
    });

    spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'clear').andCallFake(function() {
      store = {};
    });

    spyOn(Object, 'keys').andCallFake(function(value) {
      var keys=[];

      for(var key in store) {
        keys.push(key);
      }

      return keys;
    });
  });

  // check to see if it has the expected function
  it('should have a get function', function() {
    expect(angular.isFunction(factory.get)).toBe(true);
    expect(angular.isFunction(factory.put)).toBe(true);
  });

  //check to see if it returns three notes initially
  it('should return three todo notes initially', function() {
    var result = factory.get();

    expect(result.length).toBe(3);
  });

  //check if it successfully adds a new item
  it('should return four todo notes after adding one more', function() {
    factory.put('Angular is awesome');

    var result = factory.get();
    expect(result.length).toBe(4);
  });
});
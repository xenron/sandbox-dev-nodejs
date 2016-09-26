/**
 * 
 */

function add (a,b){
	return a+b;
}
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
	});
	it('this is add',function(){
		expect(add(1,2)).toEqual(3);
	});
  

});

describe('this my second test',function(){
	var testVar ;
	beforeEach(function(){
		testVar = 4 ;
	});
	afterEach(function(){
		testVar = 0 ;
	});
	
	it('test num',function(){
		expect(testVar).toBe(4);
	});
	
	it('test num2',function(){
		testVar = 0;
		expect(testVar).toBe(0);
	})
});


describe('this my second test',function(){
	var testVar ;
	beforeEach(function(){
		testVar = 4 ;
	});
	afterEach(function(){
		testVar = 0 ;
	});
	
	it('test num',function(){
		expect(testVar).toBe(4);
	});
	describe('nested describe',function(){
		var tmpVar ;
		beforeEach(function(){
			tmpVar = 34;
		});
		afterEach(function(){
			tmpVar = 0 ;
		})
		it('nested describe specs',function(){
			expect(tmpVar).toBe(34);
		})
	})
});

describe("A spy", function() {
	  var foo, bar = null;
	  beforeEach(function() {
	    foo = {
	      setBar: function(value) {
	        bar = value;
	      }
	    };
	    spyOn(foo, 'setBar');
	    foo.setBar(123);
	    foo.setBar(456, 'another param');
	  });

	  it("tracks that the spy was called", function() {
	    expect(foo.setBar).toHaveBeenCalled();
	  });

	  it("tracks all the arguments of its calls", function() {
	    expect(foo.setBar).toHaveBeenCalledWith(123);
	    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
	  });
	  it("stops all execution on a function", function() {
	    // Spy的调用并不会影响真实的值，所以bar仍然是null。
	    expect(bar).toBeNull();
	  });
});
	 

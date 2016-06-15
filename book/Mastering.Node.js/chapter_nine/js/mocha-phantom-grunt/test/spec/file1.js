//	Sample test spec for the file source/js/file1.js
//
//	You will write your own, having to do with your own js files.
//
describe('testing js file "source/js/file1.js" -> Mathematics', function() {
    beforeEach(function() {
        this.Mathematics = Mathematics;
    });

    afterEach(function() {
        delete this.Mathematics;
    });
    
    describe("add(Number, Number)", function() {
    
    	it("should add 2 + 2 = 4", function() {
    		expect(this.Mathematics.add(2,2)).to.eql(4);
    	});
    });
});

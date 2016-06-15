//	Sample test spec for the file source/js/file1.js
//
//	You will write your own, having to do with your own js files.
//
describe('testing js file "source/js/file2.js"', function() {
    beforeEach(function() {
        this.b = b;
    });

    afterEach(function() {
        delete this.b;
    });
    
    describe("b()", function() {
    
    	it("should return 'bee'", function() {
    		expect(this.b()).to.eql("bee");
    	});
    });
});

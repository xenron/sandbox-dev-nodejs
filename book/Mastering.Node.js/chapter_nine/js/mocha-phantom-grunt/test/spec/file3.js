//	Sample test spec for the file source/js/file1.js
//
//	You will write your own, having to do with your own js files.
//
describe('testing js file "source/js/file3.js"', function() {
    beforeEach(function() {
        this.c = c;
    });

    afterEach(function() {
        delete this.c;
    });
    
    describe("c()", function() {
    
    	it("should return 'sea'", function() {
    		expect(this.c()).to.eql("sea");
    	});
    });
});

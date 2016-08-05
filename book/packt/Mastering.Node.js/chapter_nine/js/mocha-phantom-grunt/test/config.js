(function() {
module.exports = function(buildDir) {
	return {
		runner: {
		
			//	Gets all html files in /stage directory and
			//	runs any tests
			//
			src: [buildDir + '/stage/**/*.html'],
			options: {
				// mocha options
				mocha: {
					ignoreLeaks: false,
					
				},
				
				reporter: 'Spec',
				
				// Indicates whether 'mocha.run()' should be executed in
				// 'bridge.js'
				run: true
			}
		}
	};
};

})(this);
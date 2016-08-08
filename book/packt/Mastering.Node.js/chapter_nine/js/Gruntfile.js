module.exports = function(grunt) {
	grunt.initConfig({
		mocha: {
			all: ['./test/*.js']
		}
	});
	grunt.loadNpmTasks('grunt-mocha');
	grunt.registerTask('default', ['mocha']);
}
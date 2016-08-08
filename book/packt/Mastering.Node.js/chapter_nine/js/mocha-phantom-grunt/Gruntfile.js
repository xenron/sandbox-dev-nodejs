"use strict";

module.exports = function() {

	var config = {
	
		//	Set to whichever folder your source files exist in.
		//
		sourceDir			: "source",
		
		//	The folder into which built /stage and /deploy are placed.
		//	If you change this, update the .gitignore file (it should be ignored).
		//
		buildDir			: "build",
		
		//	The file containing the testing framework
		//
		testFrameworkFile	: "test/framework.js",
		
		jshint: {
			options: {
				jshintrc:	".jshintrc"
			}
		},
		processhtml: {
			stage: {
				options: {
					data: {
						message: "STAGE target"
					}
				}
			},
			deploy: {
				options: {
					//process: true,
					data: {
						title		: "Striving",
						isDeployed	: "YES!",
						message		: "DEPLOY target"
					}
				}
			}
		}
	};
	
	(config.processhtml.stage.files = config.processhtml.deploy.files = {})[config.buildDir] = [config.sourceDir + "/**/*.html"];
	config.jshint.files = ["Gruntfile.js", "tasks/*.js", config.sourceDir + "/js/*.js"];
	config.mocha = require("./test/config.js")(config.buildDir);

	this.initConfig(config);
	
	this.loadTasks("tasks");
	this.loadNpmTasks("grunt-contrib-jshint");
	this.loadNpmTasks('grunt-contrib-watch');
	
	this.registerTask("default", [
		"processhtml", 
		"jshint", 
		"mocha"
	]);
	
	return;
};
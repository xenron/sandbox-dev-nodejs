'use strict';

/*
	Based on work by: https://github.com/dciccale/grunt-processhtml
*/

module.exports = function(grunt) {

	var path		= require('path');
	var uglify		= require('uglify-js');
	var cleanCSS	= require('clean-css');

	var linefeed = grunt.util.linefeed;

	var HTMLProcessor = require('./lib/htmlprocessor').init(grunt);
	
	grunt.registerMultiTask('processhtml', 'Process HTML files to reflect build environment requirements, at build time', function () {
		var options = this.options({
			// process the whole file with data object when html processor finishes
			//
			process	: false,
			data	: {}
		});
	
		var data = grunt.util._.extend(options.data, {
			environment: this.target
		});
		
		var buildDir = this.target + "/";

		this.files.forEach(function(htmlFile) {
		
			var src = htmlFile.src.filter(function(filepath) {
				if(!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}
				return true;
			}).map(function(filepath) {

				var sourceDir	= path.dirname(filepath) + "/";
				var subDir		= sourceDir.substring((grunt.config.data.sourceDir + "/").length);

				var content		= grunt.file.read(filepath);
				var html		= new HTMLProcessor(content, data);
				var htmlFPath	= htmlFile.dest + "/" + buildDir + subDir + path.basename(filepath);

				//	Min/concat css and js files in build blocks
				//
				getBlocks(content).forEach(function(blk) {
					var dest		= blk.dest.split(" ");
					var blockTarg	= dest[1];
					var min;
					
					//	We need to determine if this page contains a test
					//	harness, so we check for test/framework.js in the 
					//	block includes, if any. We store these testable urls.
					//	
					//	@see	tasks/mocha.js for where these are checked.
					//
					grunt.__TESTED_PAGES__ = grunt.__TESTED_PAGES__ || {};
					blk.src.forEach(function(fname) {
						if(fname.indexOf(grunt.config.data.testFrameworkFile) > -1) {
							grunt.__TESTED_PAGES__[filepath] = 1;
						}
					});
					
					//	Given a directive like <!-- build:css:deploy css/style.min.css -->
					//	in source/index.html file, we want to write the minified file
					//	(css/style.min.css) to   build/deploy/css/style.min.css
					//	where stage and deploy are ^   ^ Note the :deploy part of directive
					//												^ could also be :stage
					//
					//	Note that there *must* be a stage || deploy target, and a dest file name.
					//
					dest = dest.length === 2	
						?	dest = htmlFile.dest + "/" + buildDir + subDir + blockTarg
						:	null;

					if(dest && blk.src.length) {
					
						//	For each of the file paths in this block modify path
						//	so that it points to source/.../blockpath, simultaneously
						//	copying over these source files into stage & deploy
						//
						blk.src = blk.src.map(function(b) {
						
							var src = sourceDir + b;
							var dst = htmlFile.dest + "/" + buildDir + subDir + b;
							grunt.file.copy(src, dst);
							grunt.log.writeln(dst + '" created.');

							return src;
						});
						
						//	For css we need to concat individuals, as clean-css doesn't 
						//	seem to allow multiple files to be minified programatically.
						//	For js, we min the group #blk.src
						//
						min =	blk.type === "css"	
								?	blk.src.reduce(function(prev, cur) {
										return prev + cleanCSS.process(grunt.file.read(cur));
									}, "")
								:	blk.type === "js"
									?	uglify.minify(blk.src).code
									:	null;

						if(min) {
							grunt.file.write(dest, min);
							grunt.log.writeln(dest + '" created.');
						}
					}
				});
			
				content	= html.process();
				
				if(options.process) {
					content = grunt.template.process(content, options);					
				}
				
				grunt.file.write(htmlFPath, content);
				grunt.log.writeln(htmlFPath + '" created. ');
				
				return content;
			}).join(grunt.util.linefeed);
		});
	});

	/**
	 * https://gist.github.com/necolas/3024891#file-task-processhtml-js
	 *
	 * Returns an array of all the directives for the given html. Results is
	 * of the following form:
	 *
	 * [{
	 *   type: 'css',
	 *   dest: 'css/site.css',
	 *   src: [ 'css/normalize.css', 'css/main.css' ],
	 *   raw: [ '    <!-- build:css css/site.css -->',
				'    <link rel="stylesheet" href="css/normalize.css">'
	 *          '    <link rel="stylesheet" href="css/main.css">'
	 *          '    <!-- endbuild -->' ]
	 * },
	 * {
	 *    type: 'js',
	 *    dest: 'js/site.js',
	 *    src: [ 'js/plugins.js', 'js/main.js' ],
	 *    raw: [ '    <!-- build:js js/site.js -->',
	 *           '    <script src="js/plugins.js">'
	 *           '    <script src="js/main.js">'
	 *           '    <!-- endbuild -->' ]
	 * }]
	 */
	var getBlocks = function(body) {
		// Start build pattern
		// <!-- build:[type] destination -->
		// TODO: use better regex for dest match
		//
		var regexBuildStart = /<!--\s*build:(\w+)\s*(.+)\s*-->/;
		// End build pattern
		// <!-- endbuild -->
		//
		var regexBuildEnd = /<!--\s*endbuild\s*-->/;
		var regexComment = /<!--(.*)-->/;
		// Match single or double quotes
		//
		var regexSrc = /src=['"]([^"']+)["']/;
		var regexHref = /href=['"]([^"']+)["']/;
	
		var lines = body.replace(/\r\n/g, '\n').split(/\n/);
		var isBlock = false;
		var sections = [];
		var src;
		var raw;
		var i = 0;
	
		lines.forEach(function(line) {
			var buildParams = line.match(regexBuildStart);
			var isBuild = regexBuildStart.test(line);
			var isBuildEnd = regexBuildEnd.test(line);
			var isComment = regexComment.test(line);
	
			if (isBuild) {
				isBlock = true;
				sections[i] = {};
				sections[i].type = buildParams[1].trim();
				sections[i].dest = buildParams[2].trim();
				sections[i].src = src = [];
				sections[i].raw = raw = [];
				i++;
			}
	
			if (isBlock && raw && src) {
				raw.push(line);
	
				if (!isComment) {
					if (regexSrc.test(line)) {
						src.push(line.match(regexSrc)[1]);
					}
					if (regexHref.test(line)) {
						src.push(line.match(regexHref)[1]);
					}
				}
	
				if (isBuildEnd) {
					isBlock = false;
				}
			}
		});
		return sections;
	};
};

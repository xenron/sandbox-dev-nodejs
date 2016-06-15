/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 *
 * Mocha task
 * Copyright (c) 2012 Kelly Miyashiro
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

'use strict';

module.exports = function(grunt) {
  var _ = grunt.util._;

  // Nodejs libs.
  var path = require('path');
  var EventEmitter = require('events').EventEmitter;

  // External lib.
  var phantomjs = require('grunt-lib-phantomjs').init(grunt);
  var reporters = require('mocha').reporters;

	/**
	 * Take a collection of stats objects and reduce them
	 *
	 * @param stats {Array} Array of mocha test stats
	 */
	
	var reduceStats = function(stats) {
		var initial = {
			passes    : 0,
			failures  : 0,
			tests     : 0,
			duration  : 0
		};
		
		// console.log(testStats);
		var total = stats.reduce(function(prev, stats, i, list) {
			prev.passes    += stats.passes;
			prev.failures  += stats.failures;
			prev.tests     += stats.tests;
			prev.duration  += (stats.end - stats.start);
			return prev;
		}, initial);
		
		total.duration = formatMs(total.duration);
		
		return total;
	};
	
	var formatMs = function(ms) {
		return (Math.ceil(ms * 100) / 100000).toFixed(2);
	};

  var reporter;

  // Growl is optional
  var growl;
  try {
    growl = require('growl');
  } catch(e) {
    growl = function(){};
    grunt.verbose.write('Growl not found, \'npm install growl\' for Growl support');
  }

  // Get an asset file, local to the root of the project.
  var asset = path.join.bind(null, __dirname, '..');

  // Manage runners listening to phantomjs
  var phantomjsEventManager = (function() {
    var listeners = {};

    // Hook on Phantomjs Mocha reporter events.
    phantomjs.on('mocha.*', function(test) {
      var name, fullTitle, slow, err;
      var evt = this.event.replace('mocha.', '');

      if (evt === 'end') {
        phantomjs.halt();
      }

      // Expand test values (and façace the Mocha test object)
      if (test) {
        fullTitle = test.fullTitle;
        test.fullTitle = function() {
          return fullTitle;
        };

        slow = this.slow;
        test.slow = function() {
          return slow;
        };

        err = test.err;
      }

      // Trigger events for each runner listening
      for (name in listeners) {
        listeners[name].emit.call(listeners[name], evt, test, err);
      }
    });

    return {
      add: function(name, runner) {
        listeners[name] = runner;
      },
      remove: function(name) {
        delete listeners[name];
      }
    };
  }());

  // Built-in error handlers.
  phantomjs.on('fail.load', function(url) {
    phantomjs.halt();
    grunt.verbose.write('Running PhantomJS...').or.write('...');
    grunt.log.error();
    grunt.warn('PhantomJS unable to load "' + url + '" URI.', 90);
  });

  phantomjs.on('fail.timeout', function() {
    phantomjs.halt();
    grunt.log.writeln();
    grunt.warn('PhantomJS timed out, possibly due to a missing Mocha run() call.', 90);
  });

  // Debugging messages.
  // phantomjs.on('debug', grunt.log.debug.bind(grunt.log, 'phantomjs'));

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('mocha', 'Run Mocha unit tests in a headless PhantomJS instance.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // Output console.log calls
      log: false,
      // Mocha reporter
      reporter: 'Dot',
      // Default PhantomJS timeout.
      timeout: 5000,
      // Mocha-PhantomJS bridge file to be injected.
      inject: asset('./tasks/lib/phantomjs/bridge.js'),
      // Main PhantomJS script file
      phantomScript: asset('./tasks/lib/phantomjs/main.js'),
      // Explicit non-file URLs to test.
      urls: [],
      // Fail with grunt.warn on first test failure
      bail: false
    });

    // console.log pass-through.
    if (options.log) {
      phantomjs.on('console', grunt.log.writeln.bind(grunt.log));
    }

    // Clean Phantomjs options to prevent any conflicts
    var PhantomjsOptions = _.omit(options, 'reporter', 'urls');

    var configStr = JSON.stringify(PhantomjsOptions, null, '  ');
    grunt.verbose.writeln('Additional configuration: ' + configStr);

    // Combine any specified URLs with src files.
    var urls = options.urls.concat(this.filesSrc);

    // Remember all stats from all tests
    var testStats = [];

    // This task is asynchronous.
    var done = this.async();

    // Process each filepath in-order.
    grunt.util.async.forEachSeries(urls, function(url, next) {
    
		//	@see tasks/processhtml.js
		//
		//	If this page has not requested a test, we skip it.
		//	This #url will begin with build/deploy/ or build/stage/
		//	__TESTED_PAGES__ urls begin with grunt.config.data.sourceDir
		//	Normalize, check if this #url is in the collection of tested
		//	pages, and if not, skip to next() one.
		//
		if(!grunt.__TESTED_PAGES__[grunt.config.data.sourceDir + url.match(new RegExp("build\/[^\/]*(.*)"))[1]]) {
			grunt.log.writeln("* No tests requested for " + url + " - skipping *");
			return next();
		}    

      grunt.log.writeln('Testing: ' + url);

      // create a new mocha runner façade
      var runner = new EventEmitter();
      phantomjsEventManager.add(url, runner);

      // Clear runner event listener when test is over
      runner.on('end', function() {
        phantomjsEventManager.remove(url);
      });

      // Set Mocha reporter
      var Reporter = reporters[options.reporter];
      
      if (Reporter == null) {
        grunt.fatal('Reporter specified is unknown');
      }
      reporter = new Reporter(runner);

      // Launch PhantomJS.
      phantomjs.spawn(url, {
        // Exit code to use if PhantomJS fails in an uncatchable way.
        failCode: 90,
        // Additional PhantomJS options.
        options: PhantomjsOptions,
        // Do stuff when done.
        done: function(err) {
          var stats = runner.stats;
          testStats.push(stats);

          if (err) {
            // Show Growl notice
            // @TODO: Get an example of this
            // growl('PhantomJS Error!');

            // If there was a PhantomJS error, abort the series.
            grunt.fatal(err);
            done();
          } else {
            // If failures, show growl notice
            if (stats.failures > 0) {
              var reduced = reduceStats([stats]);
              var failMsg = reduced.failures + '/' + reduced.tests +
                ' tests failed (' + reduced.duration + 's)';

              // Show Growl notice, if avail
              growl(failMsg, {
                image: asset('growl/error.png'),
                title: 'Failure in ' + grunt.task.current.target,
                priority: 3
              });

              // Bail tests if bail option is true
              if(options.bail) {
					grunt.warn(failMsg);
              }
            }

            // Process next file/url
            next();
          }
        }
      });
    },
    // All tests have been run.
    function() {
      var stats = reduceStats(testStats);

      if (stats.failures === 0) {
        var okMsg = stats.tests + ' passed!' + ' (' + stats.duration + 's)';

        growl(okMsg, {
          image: asset('growl/ok.png'),
          title: 'Tests passed',
          priority: 3
        });

        grunt.log.ok(okMsg);
      } else {
        var failMsg = stats.failures + '/' + stats.tests + ' tests failed (' +
          stats.duration + 's)';

        // Show Growl notice, if avail
        growl(failMsg, {
          image: asset('growl/error.png'),
          title: 'Failure in ' + grunt.task.current.target,
          priority: 3
        });

        grunt.warn(failMsg);
      }

      // Async test done
      done();
    });
  });
};
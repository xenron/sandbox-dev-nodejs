"use strict";

var fs = require('fs');
var gulp = require('gulp');

var buildDirectory = './build';

gulp.task('initialize',function(cb) {
	fs.exists(buildDirectory, function(yes) {
		if(yes) {
			return cb();
		}
		
		fs.mkdirSync(buildDirectory);
		
		cb();
	})
});

gulp.task('move', function() {
	gulp
		.src('./source/**')
		.pipe(gulp.dest('./build'))
});

gulp.task('default', ['initialize', 'move'], function() {
	console.log('Build is complete');
});


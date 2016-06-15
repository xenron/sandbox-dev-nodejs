"use strict";

//	npm install 'coffee-script' -> this is used for test
require('coffee-script/register');

var path = require('path');
var mkdirp = require('mkdirp');
var del	= require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var browserify = require('browserify');
var sass = require('gulp-sass');
var wrap = require('gulp-wrap');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');

//	A map of relevant source/build folders
var buildDir 		= './build';
var sourceDir 		= './source';
var s_scriptsDir 	= './source/scripts';
var b_scriptsDir 	= './build/js';
var s_stylesDir 	= './source/styles';
var b_stylesDir 	= './build/css';
var s_templatesDir 	= './source/templates';
var b_templatesDir 	= './build/templates';
var s_testsDir		= './source/tests';

//	Clean out build directories before each build
gulp.task('clean', function(cb) {
    del([
    	path.join(b_scriptsDir, '**/*.js'),
    	path.join(b_stylesDir, '**/*.css'),
        path.join(b_templatesDir, '*.js'),
        path.join(buildDir, '*.html')
    ], cb);
});

gulp.task('scaffold', ['clean'], function() {
	mkdirp.sync(s_scriptsDir);
	mkdirp.sync(b_scriptsDir);
	mkdirp.sync(s_stylesDir);
	mkdirp.sync(b_stylesDir);
	mkdirp.sync(s_templatesDir);
	mkdirp.sync(b_templatesDir);
	mkdirp.sync(s_testsDir);
});

//  Lint coffeescript files
gulp.task('lint', ['scaffold'], function() {
	return gulp.src(path.join(s_scriptsDir, '**/*.coffee'))
		.pipe(coffeelint('./coffeelint.json'))
		.pipe(coffeelint.reporter('default'))
});

//	Convert .coffee files to .js files and move them
gulp.task('scripts', ['lint'], function() {
  	return gulp.src(path.join(s_scriptsDir, '**/*.coffee'))
  		.pipe(changed(b_scriptsDir, {extension: '.js'}))
  		.pipe(sourcemaps.init())
    	.pipe(coffee({bare: true}))
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest(b_scriptsDir))
});

//	Convert .scss files to .css files and move them
gulp.task('styles', function() {
    return gulp.src(path.join(s_stylesDir, '**/*.scss'))
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(b_stylesDir));
});

gulp.task('templates', function () {  
	return gulp.src(path.join(s_templatesDir, '/**/*.hbs'))
		.pipe(handlebars())
		.pipe(wrap('var Handlebars = require("handlebars/runtime")["default"];module.exports = Handlebars.template(<%= contents %>);'))
		.pipe(gulp.dest(b_templatesDir));
});

// Fetch our main app code and browserify it
// This bundle will be loaded by views, such as index.html
gulp.task('browserify', ['scripts', 'templates', 'views'], function() {
	return browserify(b_scriptsDir + '/app.js')
		.bundle()
		// Converts browserify out to streaming vinyl file object 
		.pipe(source('app.js')) 
		// uglify needs conversion from streaming to buffered vinyl file object
		.pipe(buffer()) 
		.pipe(uglify()) 
		.pipe(gulp.dest(b_scriptsDir));
});

//	All .html files in source folder
gulp.task('views', ['scaffold'], function() {
	return gulp.src(path.join(sourceDir, '*.html'))
		.pipe(minifyHTML({
			empty: true
		}))
		.pipe(gulp.dest(buildDir))
});

// Run tests
gulp.task('test', ['browserify'], function() {
    return gulp.src(path.join(s_testsDir, '**/*.coffee'), {
    	read: false
    })
    .pipe(coffee({bare: true}))
	.pipe(mocha({
		reporter: 'spec'
	}));
});

// Rerun the task when a file changes
gulp.task('watch', ['scaffold'], function() {
	gulp.watch(path.join(s_scriptsDir, '**/*'), [
		'browserify', 
		browserSync.reload
	]);
	gulp.watch(path.join(s_templatesDir, '**/*'), [
		'browserify', 
		browserSync.reload
	]);
	gulp.watch(path.join(s_stylesDir, '**/*'), [
		'styles', 
		browserSync.reload
	]);
	gulp.watch(path.join(sourceDir, '*.html'), [
		'views', 
		browserSync.reload
	]);
});

// Static server
gulp.task('server', ['test','watch'], function() {
    browserSync({
    	notify: false,
    	port : 8080,
        server: {
        	baseDir: buildDir
        }
    });
});

gulp.task('default', [
	'clean',
	'scaffold', 
	'lint',
	'scripts',
	'styles',
	'templates',
	'browserify',
	'views',
	'test',
	'watch',
	'server'
]);


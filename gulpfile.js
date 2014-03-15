/*jslint node: true */

'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserify = require('browserify'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	bourbon = require('node-bourbon').includePaths,
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util');

// Styles
gulp.task('styles', function () {
	return gulp.src('app/styles/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths : [bourbon],
			errLogToConsole: true
		}))
		.pipe(gulp.dest('app/styles/css/'));
});

//Scripts

gulp.task('scripts', function() {
	// Single entry point to browserify

	var b = browserify({
		basedir: './app/js/src/',
		extensions: '.coffee'
	});
	var bundleStream = b.add('./app.js').bundle()
		.on('error',gutil.log)
		.on('error',gutil.beep);
	
	 bundleStream
		.pipe(source('app.js'))
		.pipe(plumber())
		.pipe(gulp.dest('app/js/build'));
});

// Browser sync
gulp.task('browser-sync', function() {
	browserSync.init(['app/styles/css/*.css', 'app/*.html', 'app/js/build/app.js'], {
		server: {
			baseDir: './app'
		}
	});
});



gulp.task('watch',['styles', 'browser-sync'], function() {

	// Watch .scss files
	gulp.watch('app/styles/scss/*.scss', ['styles']);
	gulp.watch('app/js/src/*.js',['scripts']);
	gulp.watch('app/js/src/*.coffee',['scripts']);

});




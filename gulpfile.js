/*jslint node: true */

'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserify = require('browserify'),
	browserSync = require('browser-sync'),
	bourbon = require('node-bourbon').includePaths,
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util');

// Styles
gulp.task('styles', function () {
	return gulp.src('app/styles/scss/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths : [bourbon],
			onError: reportError
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
	var bundleStream = b.add('./app.js').bundle({
			debug: true
		})
		.on('error',reportError);
	
	 bundleStream
		.pipe(source('app.js'))
		.pipe(gulp.dest('app/js/build'));
});

function reportError(error){
	gutil.log(gutil.colors.red(error));
	gutil.beep();
}

// Browser sync
gulp.task('browser-sync', function() {
	browserSync.init(['app/styles/css/*.css', 'app/*.html', 'app/js/build/app.js'], {
		server: {
			baseDir: './app'
		}
	});
});



gulp.task('watch',['styles','scripts', 'browser-sync'], function() {

	// Watch .scss files
	gulp.watch('app/styles/scss/*.scss', ['styles']);
	gulp.watch('app/js/src/*.js',['scripts']);
	gulp.watch('app/js/src/*.coffee',['scripts']);

});




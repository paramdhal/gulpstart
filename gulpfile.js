/*jslint node: true */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var bourbon = require('node-bourbon').includePaths;
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var task = gutil.env._[0];

// Styles
gulp.task('styles', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({
			outputStyle: task === 'build' ? 'compressed' : 'expanded',
			includePaths : [bourbon],
			onError: reportError
		}))
		.pipe(gulp.dest('app/build/css/'));
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
		.pipe(task === 'build' ? streamify(uglify()) : gutil.noop())
		.pipe(gulp.dest('app/build/js'));
});

function reportError(error){
	gutil.log(gutil.colors.red(error));
	browserSync.notify(error);
	gutil.beep();
}

// Browser sync
gulp.task('browser-sync', function() {
	browserSync.init(['app/build/css/*.css', 'app/*.html', 'app/build/js/app.js'], {
		server: {
			baseDir: './app'
		}
	});
});



gulp.task('watch',['styles','scripts', 'browser-sync'], function() {

	// Watch .scss files
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch('app/js/src/**/*.js',['scripts']);
	gulp.watch('app/js/src/**/*.coffee',['scripts']);

});

gulp.task('build',['styles','scripts']);




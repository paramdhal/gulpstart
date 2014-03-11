/*jslint node: true */

'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync');

// Styles
gulp.task('styles', function () {
	return gulp.src('app/styles/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			style: 'compressed'
		}))
		.pipe(gulp.dest('app/styles/css/'));
});

gulp.task('browser-sync', function() {
	browserSync.init(['app/styles/css/*.css', 'app/*.html'], {
		server: {
			baseDir: './app'
		}
	});
});



gulp.task('watch',['styles', 'browser-sync'], function() {

	// Watch .scss files
	gulp.watch('app/styles/scss/*.scss', ['styles']);

});
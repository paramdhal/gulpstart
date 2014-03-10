'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber');


// Styles
gulp.task('styles', function () {
	return gulp.src('styles/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			style: 'compressed'
		}))
		.pipe(gulp.dest('styles/css/'));
});

gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('styles/scss/*.scss', ['styles']);



});
var gulp = require('gulp'),
    config = require('./../modules/config.js'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint');

gulp.task('lint-js', [], function () {
    gulp.src([
            config.jsPaths.app
        ])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

var gulp = require('gulp'),
    config = require('./../modules/config.js'),
    plumber = require('gulp-plumber'),
    jscs = require('gulp-jscs');

gulp.task('fix-js-coding-style', function () {
    gulp.src([
            config.jsPaths.app,
        ], { base: '.' })
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(jscs({
            fix: true
        }))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('.'))
    ;
});

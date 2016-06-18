var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    config = require('./../modules/config.js');

gulp.task('build-fonts', function () {
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulp.dest(config.assetsDir + 'fonts/'));
});

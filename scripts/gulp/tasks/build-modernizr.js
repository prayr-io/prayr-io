var gulp = require('gulp'),
    modernizr = require('gulp-modernizr'),
    plumber = require('gulp-plumber'),
    config = require('./../modules/config.js');

gulp.task('build-modernizr', function (cb) {
    gulp.src('src/AppBundle/Resources/public/js/module/**/*.js')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(modernizr({
            options: [
                'setClasses',
                'addTest',
                'html5printshiv',
                'testProp',
                'fnBind',
                'prefixed'
            ]
        }))
        .pipe(gulp.dest(config.tmpAssetsDir)).on('end', function () {
            cb();
        });
});

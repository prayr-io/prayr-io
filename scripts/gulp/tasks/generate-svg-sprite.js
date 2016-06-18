var gulp = require('gulp'),
    config = require('./../modules/config.js'),
    rev = require('gulp-rev'),
    plumber = require('gulp-plumber'),
    svgSprite = require('gulp-svg-sprite');

gulp.task('generate-svg-sprite', function (cb) {
    gulp.src(
        [
            // add svg's
        ])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgSprite({
            mode: {
                symbol: true
            }
        }))
        .pipe(rev())
        .pipe(gulp.dest(config.assetsDir + config.svgDir))
        .pipe(rev.manifest(config.revManifestDir, {
            merge: true
        }))
        .pipe(gulp.dest('.')).on('end', function () {
            cb();
        });
});

var gulp = require('gulp'),
    config = require('./../modules/config.js'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    util = require('gulp-util'),
    rev = require('gulp-rev'),
    gulpSequence = require('gulp-sequence'),
    plumber = require('gulp-plumber'),
    expect = require('gulp-expect-file'),
    buildCssFile = function (srcPaths, targetName, cb) {
        return gulp.src(
            srcPaths, {
                base: '.'
            })
            .pipe(plumber({
                errorHandler: config.errorHandler
            }))
            .pipe(expect({ errorOnFailure: true }, srcPaths))
            .pipe(less())
            .pipe(concat(config.cssDir + targetName))
            .pipe(
                config.production ?
                    minifyCss({
                        compatibility: 'ie8',
                        keepSpecialComments: false
                    }) :
                    util.noop()
            )
            .pipe(rev())
            .pipe(gulp.dest(config.assetsDir))
            .pipe(rev.manifest(config.revManifestDir, {
                merge: true
            }))
            .pipe(gulp.dest('.')).on('end', function () {
                cb();
            });
    };

gulp.task('build-css', function (cb) {
    gulpSequence(
        'build-css-app'
    )(cb);
});

gulp.task('build-css-app', function (cb) {
    buildCssFile(
        [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/agency/less/*.less',
            'src/AppBundle/Resources/less/base/*.less',
            'src/AppBundle/Resources/less/layout/!(*-xs|*-hs|*-sm|*-md|*-lg|*-xl|*-print).less',
            'src/AppBundle/Resources/less/module/**/!(*-xs|*-hs|*-sm|*-md|*-lg|*-xl).less'
        ],
        'app.css',
        cb
    );
});

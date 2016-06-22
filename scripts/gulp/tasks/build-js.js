var gulp = require('gulp'),
    config = require('./../modules/config.js'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    util = require('gulp-util'),
    rev = require('gulp-rev'),
    rename = require('gulp-rename'),
    gulpSequence = require('gulp-sequence'),
    plumber = require('gulp-plumber'),
    expect = require('gulp-expect-file'),
    buildJsFile = function (srcPaths, targetName, cb) {
        return gulp.src(
            srcPaths, {
                base: '.'
            })
            .pipe(plumber({
                errorHandler: config.errorHandler
            }))
            .pipe(expect({ errorOnFailure: true }, srcPaths))
            .pipe(expect(srcPaths))
            .pipe(concat(config.jsDir + targetName))
            .pipe(
                config.production ?
                    uglify() :
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

gulp.task('build-js', function (cb) {
    gulpSequence(
        'build-js-app'
    )(cb);
});

gulp.task('build-js-app', function (cb) {
    gulpSequence(
        'build-modernizr',
        'build-js-app-basic'
    )(cb);
});

gulp.task('build-js-app-basic', function (cb) {
    gulpSequence(
        'build-js-app-main-top',
        'build-js-app-main-bottom'
    )(cb);
});

gulp.task('build-js-app-main-top', function (cb) {
    buildJsFile(
        [
            config.tmpAssetsDir + 'modernizr.js'
        ],
        'app-main-top.js',
        cb
    );
});

gulp.task('build-js-app-main-bottom', function (cb) {
    buildJsFile(
        [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/agency/js/classie.js',
            'node_modules/agency/js/cbpAnimatedHeader.js',
            'node_modules/agency/js/jqBootstrapValidation.js',
            'node_modules/agency/js/agency.js',
            'src/AppBundle/Resources/public/js/main.js',
            'src/AppBundle/Resources/public/js/module/**/*.js'
        ],
        'app-main-bottom.js',
        cb
    );
});

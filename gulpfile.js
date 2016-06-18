var gulp = require('gulp'),
    requireDir = require('require-dir'),
    gulpSequence = require('gulp-sequence'),
    config = require('./scripts/gulp/modules/config.js'),
    tasks = requireDir('./scripts/gulp/tasks');

gulp.task('default', function(cb) {
    gulpSequence(
        'create-assets',
        'watch-assets'
    )(cb)
});

gulp.task('be-a-code-nazi', [
    'fix-js-coding-style',
    'lint-js'
], function() {});

gulp.task('create-assets', function(cb) {
    gulpSequence(
        'clean-up-assets',
        'build-assets'
    )(cb)
});

gulp.task('build-assets', [
    'build-fonts',
    'build-sequential-assets'
], function() {});

gulp.task('build-sequential-assets', function(cb) {
    gulpSequence(
        'copy-static-assets',
        'generate-svg-sprite',
        'build-js',
        'build-css'
    )(cb)
});

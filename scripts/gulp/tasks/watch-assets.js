var gulp = require('gulp'),
    config = require('./../modules/config.js');

gulp.task('watch-assets', function () {
    // css
    gulp.watch([
        'src/AppBundle/Resources/less/**/*'
    ], ['build-css-app']);

    // js
    gulp.watch([
        config.jsPaths.app
    ], ['build-js-app-basic']);
});

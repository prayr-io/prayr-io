var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    config = require('./../modules/config.js');

gulp.task('copy-static-assets', function (cb) {
    var i,
        finishedCounter = 0,
        checkIfWeShouldExit = function () {
            finishedCounter += 1;

            if (finishedCounter >= mappings.length) {
                cb();
            }
        },

        mappings = [
            {
                src: 'src/AppBundle/Resources/public/**/*',
                target: config.assetsDir + 'bundles/app/'
            }
        ];

    for (i = 0; i < mappings.length; i++) {
        gulp.src(mappings[i].src)
            .pipe(plumber({
                errorHandler: config.errorHandler
            }))
            .pipe(gulp.dest(mappings[i].target)).on('end', checkIfWeShouldExit);
    }
});

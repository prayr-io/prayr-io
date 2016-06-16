var gulp = require('gulp'),
    del = require('del'),
    config = require('./../modules/config.js');

gulp.task('clean-up-assets', function (cb) {
    del.sync([
        config.tmpAssetsDir + '*',
        config.assetsDir + config.cssDir + '*',
        config.assetsDir + config.jsDir + '*',
        config.assetsDir + config.svgDir + '*'
    ]);

    cb();
});

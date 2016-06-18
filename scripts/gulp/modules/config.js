var util = require('gulp-util');

module.exports = {
    production: !!util.env.production,
    jsPaths: {
        app: 'src/AppBundle/Resources/public/js/**/*.js',
        gulp: 'scripts/gulp/**/*.js'
    },
    revManifestDir: 'app/Resources/assets/rev-manifest.json',
    tmpAssetsDir: 'app/Resources/assets/',
    assetsDir: 'web/',
    jsDir: 'js/',
    cssDir: 'css/',
    svgDir: 'svg/',
    errorHandler: function (err) {
        util.colors.enabled = true;
        util.beep();
        util.log(util.colors.red('Error (' + err.plugin + '): ' + err.message));
        this.emit('end');
    }
};

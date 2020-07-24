const   browserSync = require('browser-sync').create('mainServer'),
        gulp = require('gulp'),
        pug = require("./gulp/modules/pug"),
        fonts  = require("./gulp/modules/fonts"),
        icon = require("./gulp/modules/icon"),
        images  = require("./gulp/modules/images"),
        scripts = require("./gulp/modules/scripts"),
        styles = require("./gulp/modules/styles"),
        video = require("./gulp/modules/video"),
        clear = require('./gulp/modules/clear'),
        serve = require('./gulp/modules/serve'),
        startupConfig = require('./gulp/modules/startupConfig');

function setProd(){
    global.isProd = true;
}
module.exports.build = gulp.series( startupConfig,/* serve,*/ clear, pug, gulp.parallel(styles, scripts, fonts, icon), video, images, serve);
module.exports.img = gulp.series(images);
module.exports.prod = gulp.series( setProd, startupConfig, clear, pug, gulp.parallel(styles, scripts, fonts, icon, images, video));
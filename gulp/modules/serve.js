const   browserSync = require('browser-sync').get('mainServer'),
        gulp = require('gulp'),
        pug = require('./pug'),
        img = require('./images'),
        icons = require('./icon'),
        fonts = require('./fonts'),
        video = require('./video'),
        scripts = require('./scripts'),
        styles = require('./styles');
    
module.exports = function serve(cb){
    browserSync.init({
        server: './build',
        watch: true,
        ghostMode: true,
        browser: ['firefox'],
        notify: false,
        open: false
    })

    gulp.watch('./src/assets/fonts/**/*').on('change', gulp.series(icons, browserSync.reload));
    gulp.watch('./src/assets/icons/**/*').on('change', gulp.series(fonts, browserSync.reload));
    gulp.watch('./src/img/**/*').on('change', gulp.series(img, browserSync.reload));
    gulp.watch('./src/**/*.pug').on('change', gulp.series(pug, browserSync.reload));
    gulp.watch('./src/assets/js/**/*',scripts);
    gulp.watch(['./src/assets/css/**/*','./src/main.sass'],styles);
    gulp.watch('./src/assets/video/**/*').on('change', gulp.series(video, browserSync.reload));
    return cb();
}
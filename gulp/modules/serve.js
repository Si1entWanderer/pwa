const   browserSync = require('browser-sync').get('mainServer'),
        gulp = require('gulp'),
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

    gulp.watch('./src/assets/fonts/**/*').on('change', browserSync.reload);
    gulp.watch('./src/assets/icons/**/*').on('change', browserSync.reload);
    gulp.watch('./src/img/**/*').on('change', browserSync.reload);
    gulp.watch('./src/**/*.pug').on('change', browserSync.reload);
    gulp.watch('./src/assets/js/**/*',scripts);
    gulp.watch(['./src/assets/css/**/*','./src/main.sass'],styles);
    gulp.watch('./src/assets/video/**/*').on('change', browserSync.reload);
    return cb();
}
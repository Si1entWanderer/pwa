const   browserSync = require('browser-sync').get('mainServer'),
        gulp = require("gulp"),
        sass = require("gulp-sass"),
        autoprefixer = require("gulp-autoprefixer"),
        stylelint = require('gulp-stylelint');

const path = {
    src: ['./src/main.sass'],
    dest: './build/assets/css/'
};
    
module.exports = function styles(cb){
    return  gulp.src(path.src)
                .pipe(stylelint({
                    failAfterError: false,
                    reporters:[
                        {formatter: 'string', console: true}
                    ],
                    debug: true
                }))
                .pipe(sass({
                    outputStyle: isProd?'compressed':'compact'
                }).on('error', sass.logError))
                .pipe(autoprefixer())
                .pipe(gulp.dest(path.dest, {
                    sourcemaps: !isProd
                }))
                .pipe(browserSync.stream())
}
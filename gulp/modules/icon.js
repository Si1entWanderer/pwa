const   gulp = require("gulp")
        imagemin = require('gulp-imagemin');

const path = {
    src: ['./src/assets/icons/**/*'],
    dest: './build/assets/icons/'
};

module.exports = function icon(){
    return  gulp.src(path.src)
                .pipe(gulp.dest(path.dest));
}
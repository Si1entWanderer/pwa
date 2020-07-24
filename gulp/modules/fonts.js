const   gulp = require("gulp");

const path = {
    src: ['./src/assets/fonts/*'],
    dest: './build/assets/fonts/'
};

module.exports = function fonts(){
    return  gulp.src(path.src)
                .pipe(gulp.dest(path.dest));
}
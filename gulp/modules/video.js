const   gulp = require("gulp");

const path = {
    src: ["./src/assets/video/**/*.*"],
    dest: "./build/assets/video"
};

module.exports = function video(){
    return  gulp.src(path.src)
                .pipe(gulp.dest(path.dest));
}
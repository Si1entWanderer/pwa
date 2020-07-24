const   gulp = require("gulp"),
        pug = require("gulp-pug");

const path = {
    src: ['./src/*.pug','./src/templates/**/*.pug'],
    dest: "./build/"
};

module.exports = function html(){
    return  gulp.src(path.src)
                .pipe(pug())
                .pipe(gulp.dest(path.dest));   
}
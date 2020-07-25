const   gulp = require("gulp"),
        prettyHtml = require('./pretty'),
        pug = require("gulp-pug");

const path = {
    src: ['./src/*.pug','./src/templates/**/*.pug'],
    dest: "./build/"
};

module.exports = function html(){
    return  gulp.src(path.src)
                .pipe(pug())
                .pipe(prettyHtml())
                .pipe(gulp.dest(path.dest));   
}
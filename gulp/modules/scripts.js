const   browserSync = require('browser-sync').get('mainServer'),
        gulp = require("gulp"),
        terser = require("gulp-terser"),
        rigger = require('gulp-rigger'),
        concat = require('gulp-concat'),
        eslint = require('gulp-eslint'),
        babel = require('gulp-babel'),
        plumber = require('gulp-plumber');

const path = {
    src: ['./src/assets/js/**/*.js'],
    dest: './build/assets/js'
};

module.exports = function scripts(){
    return  gulp.src(path.src, {sourcemaps: !isProd})
                .pipe(plumber())
                .pipe(rigger())
                .pipe(concat('bundle.js'))
                .pipe(eslint({
                    "configFile": './.eslintrc.json',
                }))
                .pipe(eslint.result(result => {
                    // Called for each ESLint result.
                    console.log(`ESLint result: ${result.filePath}`);
                    console.log(`# Messages: ${result.messages.length}`);
                    console.log(`# Warnings: ${result.warningCount}`);
                    console.log(`# Errors: ${result.errorCount}`);
                }))
                .pipe(eslint.format())
                .pipe(babel())
                .pipe(terser())
                .pipe(gulp.dest(path.dest,{sourcemaps: !isProd}))
                .pipe(browserSync.stream())
}
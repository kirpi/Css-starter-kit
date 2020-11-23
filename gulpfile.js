const {src, dest, series,watch} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const stylefmt = require('gulp-stylefmt');
const browserSync = require('browser-sync').create();
const filePath = {
    scss: "./src/**/*.scss",
    css: "./dist/assets/css/",
    icon: "../src/assets/icon/*.svg",
}



function scss(){
    return src(filePath.scss)
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(stylefmt())
        .pipe(dest(filePath.css))
}

function serve(){
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
    watch(filePath.scss,scss);
    watch("./dist/index.html").on('change',browserSync.reload)

}

exports.default = series(serve,scss);
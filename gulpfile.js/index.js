const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require("browser-sync").create();
const args = require("minimist")(process.argv.slice(2));

function sass() {
  return gulp
    .src("./src/assets/style/sass/**/*.scss")
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest("./dist/assets/style/css"));
}

function browser() {
  browserSync.init({
    server: "./",
    port: 8080,
  });
}

function html() {
  return gulp
    .src("./src/views/**/*.html")
    .pipe($.plumber())
    .pipe($.frontMatter())
    .pipe($.layout((file) => file.frontMatter))
    .pipe(gulp.dest("./dist/views"));
}

function clean() {
  return gulp.src("./dist", { read: false, allowEmpty: true }).pipe($.clean());
}

exports.sass = sass;
exports.browser = browser;
exports.html = html;
exports.clean = clean;

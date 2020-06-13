const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require("browser-sync").create();
const args = require("minimist")(process.argv.slice(2));
const { watch, series, src, dest } = gulp;

function sass() {
  return src("./src/assets/styles/sass/**/*.scss")
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(dest("./dist/assets/styles/css"));
}

function html() {
  return src("./src/views/**/*.html")
    .pipe($.plumber())
    .pipe($.frontMatter())
    .pipe($.layout((file) => file.frontMatter))
    .pipe(dest("./dist/views"));
}

function _reload(done) {
  browserSync.reload();
  done();
}

function serve() {
  browserSync.init({
    server: { baseDir: "dist", index: "./views/index.html" },
    port: 8080,
  });

  watch("src/views/**/*.{html,ejs}", series([html, _reload]));
  watch("src/assets/styles/**/*.{scss,css}", series([sass, _reload]));
}

function clean() {
  return src("./dist", { read: false, allowEmpty: true }).pipe($.clean());
}

exports.html = html;
exports.sass = sass;
exports.serve = serve;
exports.clean = clean;

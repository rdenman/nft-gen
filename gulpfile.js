const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;

function html() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

function css() {
  return gulp
    .src("src/*.scss")
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest("build"));
}

function js() {
  return gulp.src("src/*.js").pipe(uglify()).pipe(gulp.dest("build"));
}

function assets() {
  return gulp
    .src(["src/robots.txt", "src/favicon.ico"])
    .pipe(gulp.dest("build"));
}

gulp.task("watch", function () {
  gulp.watch(["src/*"], gulp.series(html, css, js, assets));
});

exports.default = gulp.series(html, css, js, assets);

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("node-sass"));
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const useref = require("gulp-useref");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const del = require("del");
const csso = require("gulp-csso");
const ts = require("gulp-typescript");
const concat = require("gulp-concat");

function clean(cb) {
  del.sync("dist");
  console.log("dist folder deleted");
  cb();
}

function scss(cb) {
  gulp
    .src("styles/main.scss")
    .pipe(sass()) // Using gulp-sass
    .pipe(csso())
    .pipe(gulpif(".css", cssnano()))
    .pipe(rename({ basename: "style", extname: ".min.css" }))
    .pipe(gulp.dest("dist"));
  console.log("scss processed");
  cb();
}

function bootstrap(cb) {
  gulp.src("styles/bootstrap.min.css").pipe(gulp.dest("dist"));
  cb();
}

function javascript(cb) {
  const tsProject = ts.createProject("tsconfig.json");
  const tsResult = gulp
    .src("ts/**/*.ts")
    .pipe(tsProject())
    .js.pipe(concat("bundle.js"))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ basename: "main", extname: ".min.js" }))
    .pipe(gulp.dest("dist"));
  // .pipe(concat("bundle.ts"))
  // .pipe(babel())
  // .pipe(uglify())
  // .pipe(rename({ basename: "main", extname: ".min.js" }))
  // .pipe(gulp.dest("dist"))
  // .pipe(
  //   browserSync.reload({
  //     stream: true,
  //   })
  // );
  console.log("typescrypt processed");
  cb();
}

function images(cb) {
  gulp
    .src("assets/images/**/*.+(png|jpg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          // Setting interlaced to true for GIFs
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("dist/assets/images"));
  console.log("images processed");
  cb();
}

function fonts(cb) {
  gulp.src("assets/fonts/**/*").pipe(gulp.dest("dist/assets/fonts"));
  console.log("fonts processed");
  cb();
}

function useIndex(cb) {
  gulp.src("views/*.html").pipe(useref()).pipe(gulp.dest("dist"));
  console.log("useIndex processed");
  cb();
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  console.log("serve processed");
  cb();
}

function watch() {
  gulp
    .watch("views/**/*.html", { events: "all" }, useIndex)
    .on("change", browserSync.reload);
  gulp
    .watch("styles/**/*.scss", { events: "all" }, scss)
    .on("change", browserSync.reload);
  gulp
    .watch("ts/**/*.ts", { events: "all" }, javascript)
    .on("change", browserSync.reload);
}

exports.default = gulp.series(images, fonts, serve, watch);

exports.build = gulp.series(
  clean,
  gulp.parallel(scss, bootstrap, javascript),
  useIndex,
  images,
  fonts
);

exports.clean = gulp.series(clean);

"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
    ' * Rui Costa - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2020-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/rcostapr/javascript-clock/blob/master/LICENSE)\n',
    ' */\n',
    '\n'
].join('');

// BrowserSync
function browserSync(done) {

    browsersync.init({
        server: {
            baseDir: "./public"
        },
        port: 3035
    });
    done();
}

/*
  browsersync.init({
    server: {
      baseDir: "./public"
    },
    port: 3000
  });
  done();
}
*/

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean vendor
function clean() {
    return del(["./public/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {

    // Bootstrap JS
    var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
        .pipe(gulp.dest('./public/vendor/bootstrap/js'));
    // Bootstrap SCSS
    var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
        .pipe(gulp.dest('./public/vendor/bootstrap/scss'));

    // Bootstrap CSS
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/*.min.*')
        .pipe(gulp.dest('./public/vendor/bootstrap/css'));

    // jQuery Easing
    var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
        .pipe(gulp.dest('./public/vendor/jquery-easing'));
    // jQuery
    var jquery = gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./public/vendor/jquery'));

    // jQuery UI
    var jqueryui = gulp.src([
        './node_modules/jquery-ui-dist/jquery-ui.min.js',
        './node_modules/jquery-ui-dist/jquery-ui.min.css',
        './node_modules/jquery-ui-dist/jquery-ui.theme.min.css',
    ])
        .pipe(gulp.dest('./public/vendor/jqueryui'));
    ;

    return merge(bootstrapJS, bootstrapSCSS, bootstrapCSS, jquery, jqueryui, jqueryEasing);
}

// CSS task
function css() {
    return gulp
        .src("./scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded",
            includePaths: "./node_modules",
        }))
        .on("error", sass.logError)
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./public/css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./public/css"))
        .pipe(browsersync.stream());
}

// JS task
function js() {
    return gulp
        .src([
            './public/js/*.js',
            '!./public/js/*.min.js',
            './src/analog-clock.js',
        ])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/js'))
        .pipe(browsersync.stream());
}

// DIST task
function dist() {
    return gulp
        .src([
            './src/analog-clock.js',
        ])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
}

// Watch files
function watchFiles() {
    gulp.watch("./scss/**/*", css);
    gulp.watch(["./public/js/**/*", "!./public/js/**/*.min.js"], js);
    gulp.watch(["./src/analog-clock.js"], js);
    gulp.watch("./**/public/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js, dist));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;

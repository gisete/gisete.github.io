// Include gulp
var gulp = require('gulp');

// Include Plugins
var sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber= require('gulp-plumber'),
    header = require('gulp-header'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    include = require('gulp-include'),
    browserSync = require('browser-sync'),
    connect = require('gulp-connect');
    sourcemaps = require('gulp-sourcemaps');

//Run webserver
gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

//Live reload
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(['scss/*.scss'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', sass.logError)
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('./css/style.css'))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {  
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/dist'))
        .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('./*.html', ['html']);
    gulp.watch('js/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['webserver','scripts','sass','watch']);
const gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');


// devELOPMENT STAGE

// compile scss to css
gulp.task('sass', function() {
  return gulp.src('dev/assets/scss/**/*.scss')
    .pipe(sass()) //converts Sass to Css using gulp-sass
    .pipe(gulp.dest('dev/assets/css/'))
    .pipe(browserSync.reload({ //browser reloas on change
      stream: true
    }))
});

// browserSync
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  })
});

// Watch for changes, compile CSS and reload browser
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('dev/assets/scss/**/*.scss', ['sass']); // watches sass files and runs 'sass' task on save
  // reloads the browser whenever HTML or JS files change
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/assets/js/**/*.js', browserSync.reload)
});


// OPTIMIZATION STAGE

// Combine and Minify JS and CSS
gulp.task('useref', function(){
  return gulp.src('dev/*.html')
    .pipe(useref())
    // if JS, use uglify
    .pipe(gulpIf('*.js', uglify()))
    // if CSS, use cssnano
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('production'))
});

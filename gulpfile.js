// Libraries
var gulp = require('gulp'),
  sass = require('gulp-sass');

// Compile CSS
gulp.task('scss', function () {
  return gulp.src('./grids/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// Compile all assets
gulp.task('dist', ['scss'], function() { });

// Default
gulp.task('default', ['dist'], function() {
  gulp.watch('grids/*.scss' , ['scss']);
  gulp.watch('graaf.scss' , ['scss']);
});

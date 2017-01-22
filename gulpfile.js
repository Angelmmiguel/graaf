// Libraries
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  config = require('./package.json');

// Folders
var dist = './dist',
  siteDist = './site/dist';

// Current grids
var currentGrids = [
  {
    name: 'Bootstrap',
    width: 1170,
    columns: 12,
    gutter: 16,
    url: 'https://s3-eu-west-1.amazonaws.com/graaf/bootstrap.css'
  },
  {
    name: 'Dribbble',
    width: 970,
    columns: 4,
    gutter: 30,
    url: 'https://s3-eu-west-1.amazonaws.com/graaf/dribbble.css'
  },
  {
    name: 'Github',
    width: 980,
    columns: 12,
    gutter: 20,
    url: 'https://s3-eu-west-1.amazonaws.com/graaf/github.css'
  },
  {
    name: 'Graaf',
    width: 793,
    columns: 10,
    gutter: 16,
    url: 'https://s3-eu-west-1.amazonaws.com/graaf/graaf.css'
  },
  {
    name: 'NY Times',
    width: 970,
    columns: 5,
    gutter: 16,
    url: 'https://s3-eu-west-1.amazonaws.com/graaf/nytimes.css'
  }
];

currentGrids = currentGrids.map(function(grid) {
  grid.filename = grid.name.toLowerCase().replace(' ', '') + '.css';
  return grid;
})

// Compile Grid CSS
gulp.task('scss', function () {
  return gulp.src('./grids/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(dist));
});

// Compile all assets
gulp.task('dist', ['scss'], function() { });

// Default
gulp.task('default', ['dist'], function() {
  gulp.watch('grids/*.scss' , ['scss']);
  gulp.watch('graaf.scss' , ['scss']);
});

// Gulp tasks for the site
gulp.task('site-scss', function () {
  return gulp.src('./site/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(siteDist));
});

gulp.task('site-views', function() {
  return gulp.src('./site/index.pug')
    .pipe(pug({
      data: {
        currentGrids: currentGrids,
        version: config.version
      }
    }))
    .pipe(gulp.dest(siteDist));
});

// Save static files
gulp.task('site-static', function() {
  return gulp.src([
    './site/static/*',
    './dist/graaf.css'
  ]).pipe(gulp.dest(siteDist));
});

// Optimize JS
gulp.task('site-js-dist', function() {
  return gulp.src('./site/graaf.js')
    .pipe(uglify())
    .pipe(gulp.dest(siteDist));
})

gulp.task('site-js', function() {
  return gulp.src('./site/graaf.js')
    .pipe(gulp.dest(siteDist));
})

// Optimize svg
gulp.task('site-images', function() {
  return gulp.src('./site/images/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('./site/dist/images'));
});

// Compile the site
gulp.task('site-dist', ['site-scss', 'site-views', 'site-static', 'site-images', 'site-js-dist'], function() { });
gulp.task('site-watch', ['site-scss', 'site-views', 'site-static', 'site-images', 'site-js'], function() {
  gulp.watch('./site/style.scss' , ['site-scss']);
  gulp.watch('./site/graaf.js' , ['site-js']);
  gulp.watch('./site/index.pug' , ['site-views']);
  gulp.watch('./site/partials/*.pug' , ['site-views']);
  gulp.watch('./site/images/*.svg' , ['site-images']);
});

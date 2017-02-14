// Libraries
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  ghPages = require('gulp-gh-pages'),
  config = require('./package.json');

// Folders
var dist = './dist',
  siteDist = './site/dist';

// Current grids
var currentGrids = [
  {
    name: 'A Book Apart',
    width: 940,
    columns: 12,
    gutter: 20,
    url: 'https://grids.graaf.space/abookapart.css'
  },
  {
    name: 'A List Apart',
    width: 960,
    columns: 8,
    gutter: 24,
    url: 'https://grids.graaf.space/alistapart.css'
  },
  {
    name: 'BBC News',
    width: 976,
    columns: 12,
    gutter: 16,
    url: 'https://grids.graaf.space/bbc.css'
  },
  {
    name: 'Bootstrap',
    width: 1170,
    columns: 12,
    gutter: 16,
    url: 'https://grids.graaf.space/bootstrap.css'
  },
  {
    name: 'CNN Inter.',
    width: 1100,
    columns: 7,
    gutter: 20,
    url: 'https://grids.graaf.space/cnn.css'
  },
  {
    name: 'Dribbble',
    width: 970,
    columns: 4,
    gutter: 30,
    url: 'https://grids.graaf.space/dribbble.css'
  },
  {
    name: 'Github',
    width: 980,
    columns: 12,
    gutter: 20,
    url: 'https://grids.graaf.space/github.css'
  },
  {
    name: 'Graaf',
    width: 793,
    columns: 10,
    gutter: 16,
    url: 'https://grids.graaf.space/graaf.css'
  },
  {
    name: 'Harvard',
    width: 1176,
    columns: 12,
    gutter: 20,
    url: 'https://grids.graaf.space/harvard.css'
  },
  {
    name: 'HBO',
    width: 1184,
    columns: 12,
    gutter: 24,
    url: 'https://grids.graaf.space/hbo.css'
  },
  {
    name: 'Medium',
    width: 1000,
    columns: 3,
    gutter: 18,
    url: 'https://grids.graaf.space/medium.css'
  },
  {
    name: 'NY Times',
    width: 970,
    columns: 5,
    gutter: 16,
    url: 'https://grids.graaf.space/nytimes.css'
  },
  {
    name: 'Product Hunt',
    width: 1070,
    columns: 8,
    gutter: 20,
    url: 'https://grids.graaf.space/producthunt.css'
  },
  {
    name: 'Soundcloud',
    width: 1180,
    columns: 12,
    gutter: 20,
    url: 'https://grids.graaf.space/soundcloud.css'
  },
  {
    name: 'The guardian',
    width: 1100,
    columns: 14,
    gutter: 20,
    url: 'https://grids.graaf.space/theguardian.css'
  },
  {
    name: 'Twitter',
    width: 1190,
    columns: 4,
    gutter: 10,
    url: 'https://grids.graaf.space/twitter.css'
  }
];

currentGrids = currentGrids.map(function(grid) {
  var splitted = grid.url.split('/');
  grid.filename = splitted[splitted.length - 1];
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
  return gulp.src('./site/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./site/dist/images'));
});

// Deploy!
gulp.task('deploy', ['site-dist'], function() {
  return gulp.src(siteDist + '/**/*')
    .pipe(ghPages());
});

// Compile the site
gulp.task('site-dist', ['site-scss', 'site-views', 'site-static', 'site-images', 'site-js-dist'], function() { });
gulp.task('site-watch', ['site-scss', 'site-views', 'site-static', 'site-images', 'site-js'], function() {
  gulp.watch('./site/style.scss' , ['site-scss']);
  gulp.watch('./site/graaf.js' , ['site-js']);
  gulp.watch('./site/index.pug' , ['site-views']);
  gulp.watch('./site/partials/*.pug' , ['site-views']);
  gulp.watch('./site/images/*' , ['site-images']);
});

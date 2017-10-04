'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var localConf = require('./local-conf');
var $ = require('gulp-load-plugins')();


// Styles
// ------
// Compile SCSS into CSS then Autoprefix and Bless
// Outputs: /Assets/EPA/css/styles.css
//
gulp.task('styles', function () {
   return gulp.src(path.join(localConf.paths.css.src, '/style.scss'))
      .pipe($.sourcemaps.init())
         .pipe($.sass({ 
            style: 'expanded'
         })).on('error', conf.errorHandler('Sass'))
         .pipe($.autoprefixer({
            browser: ['last 2 versions'],
            cascade: false
         })).on('error', conf.errorHandler('Autoprefixer'))
         .pipe($.bless({ 
            imports: false 
         })).on('error', conf.errorHandler('Bless'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(localConf.paths.css.dest)); // dist/css/style*.css (remember bless)
});


// Styles Minification (csso)
// --------------------------
// Performs additional minification task after running styles
// Outputs: /Assets/EPA/css/styles.min.css
//
gulp.task('styles:min', ['styles'], function () {
   return gulp.src([
      path.join(localConf.paths.css.dest, '/*.css'),
      '!' + path.join(localConf.paths.css.dest, '/*.min.css')
   ])
   .pipe($.csso())
   .pipe($.rename({
      suffix: '.min'
   }))
   .pipe(gulp.dest(localConf.paths.css.dest));
});
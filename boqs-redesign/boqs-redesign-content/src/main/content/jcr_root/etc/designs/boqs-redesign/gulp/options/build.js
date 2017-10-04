'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var conf = require('./conf');
var localConf = require('./local-conf');
var $ = require('gulp-load-plugins')({
   pattern: ['gulp-*', 'gulp.*', 'run-sequence']
});


// Clean
gulp.task('clean:css', function () {
   return del(localConf.paths.css.dest, { force: true });
});
gulp.task('clean:fonts', function () {
   return del(localConf.paths.fonts.dest, { force: true });
});
gulp.task('clean:img', function () {
   return del(localConf.paths.img.dest, { force: true });
});
gulp.task('clean:js', function () {
   return del(localConf.paths.js.dest, { force: true });
});
gulp.task('clean:all', ['clean:css', 'clean:fonts', 'clean:img', 'clean:js']);


gulp.task('devbuild', function (cb) {
   $.runSequence(
      // 'clean:all',
      // ['styles', 'scripts', 'copy:all'],
      ['styles'],
      cb
   );
});

gulp.task('build', function (cb) {
   $.runSequence(
      'devbuild',
      // ['styles:min', 'scripts:min'],
      ['styles:min'],
      cb
   );
});

gulp.task('default', ['devbuild']);

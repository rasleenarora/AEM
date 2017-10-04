'use strict';

var path = require('path');
var gulp = require('gulp');
var browsersync = require('browser-sync').get('My Server');
var conf = require('./conf');
var localConf = require('./local-conf');
var $ = require('gulp-load-plugins')({
   pattern: ['gulp-*', 'gulp.*', 'run-sequence']
});


// BrowserSync
// -----------
gulp.task('browsersync:proxy', ['devbuild'], function (cb) {
   browsersync.init({
      proxy: localConf.paths.server.proxyURL,
      port: '3000',
      // files: '',
      online: true,
      logLevel: 'debug',
      logConnections: true,
      ghostMode: false,
      reloadDelay: 500
      // notify: false
   }, cb);
});

// BS: Styles stream
/*gulp.task('browsersync:stream-styles', ['styles'], function () {
   return gulp.src(path.join(localConf.paths.css.dest, '/style.css'))
      .pipe(browsersync.stream());
});*/

// BS: Trigger a reload
gulp.task('browsersync:reload-styles', ['styles', 'commit-styles'], function (cb) {
   browsersync.reload();
   cb();
});
gulp.task('browsersync:reload-html', ['commit-html'], function (cb) {
   browsersync.reload();
   cb();
});



// Watch
// -----
gulp.task('watch', function (cb) {
   // Styles
   gulp.watch([
         path.join(localConf.paths.css.src, '/**/*.scss'),
         path.join(localConf.paths.modules.src, '/**/*.scss')
      ], ['styles', 'browsersync:reload-styles']);

   // HTML
   gulp.watch(path.join(localConf.paths.html.src, '/**/*.jsp'), ['browsersync:reload-html']);

   cb();
});


// Commit
gulp.task('commit-styles', ['styles'], function () {
   return $.run('vlt commit /Users/jsteni/projects/BOQS/Website/boqs-redesign/boqs-redesign-content/src/main/content/jcr_root/etc/designs/boqs-redesign/headlibs/css/style.css --quiet --force').exec();
});
gulp.task('commit-html', function () {
   return $.run('vlt commit /Users/jsteni/projects/BOQS/Website/boqs-redesign/boqs-redesign-content/src/main/content/jcr_root/apps/boqs-redesign/ --quiet --force').exec();
});

// Serve Proxy
// -----------
// Performs devbuild and watch, plus proxy Browsersync setup (proxying 
// an external server URL and syncing files via Rsync)
//
gulp.task('serve:proxy', ['devbuild', 'browsersync:proxy', 'watch']);

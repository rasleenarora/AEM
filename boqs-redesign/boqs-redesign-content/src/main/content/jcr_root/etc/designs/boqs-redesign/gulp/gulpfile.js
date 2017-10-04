'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create('My Server');

// for recursive folder processing
var wrench = require('wrench');

// load all tasks from the local gulp folder
wrench.readdirSyncRecursive('./options').filter(function (file) {
   return (/\.(js)$/i).test(file);
}).map(function (file) {
   require('./options/' + file);
});

// default task is to compile sass
gulp.task('default', ['styles']);

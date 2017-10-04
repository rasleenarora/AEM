/**
*  This file contains the variables used in other gulp files
*  which defines tasks
*  By design, we only put there very generic config values
*  which are used in several places to keep good readability
*  of the tasks
*/

'use strict';

var gutil = require('gulp-util');

// folder settings are in local-conf.js (based on local-conf-example.js)

/**
*  Common implementation for an error handler of a Gulp plugin
*/
exports.errorHandler = function (title) {
   return function (err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
   };
};

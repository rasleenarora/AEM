'use strict';

// Relative root path from `gulpfile.js` folder
var pathRoot = '../';

exports.paths = {
   pathRoot: pathRoot,

   css: {
      src: pathRoot + 'headlibs/scss',
      dest: pathRoot + 'headlibs/css'
   },
   modules: {
      src: pathRoot + 'headlibs/modules'
   },
   /*js: {
      src: '',
      dest: ''
   },*/
   html: {
      src: pathRoot + '../../../apps/boqs-redesign'
   },
   server: {
      proxyURL: 'http://localhost:4502' // The server to proxy
   }
};
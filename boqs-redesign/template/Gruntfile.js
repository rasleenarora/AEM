module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'source/views/',
      assets: 'source/assets/',
      build: 'public/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['**/*.jade', '!blocks/**', '!layouts/**', '!mixins/**'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }]
      }
    },
    less: {
      build: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.assets %>css/style.less',
          // '<%= meta.build %>css/bootstrap.css': '<%= meta.assets %>css/bootstrap/bootstrap.less',
          '<%= meta.build %>css/ie.css': '<%= meta.assets %>css/ie.less',
          '<%= meta.build %>css/print.css': '<%= meta.assets %>css/print.less'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.assets %>js/libs/modernizr.2.8.3.js','<%= meta.assets %>js/libs/detectizr.js'],
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-2.1.3.js', '<%= meta.assets %>js/libs/mustache-2.3.0.js', '<%= meta.assets %>js/libs/picturefill-3.0.2.min.js', '<%= meta.assets %>js/libs/transition-bootstrap-3.3.4.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/*.js', '!<%= meta.assets %>js/plugins/plugin.js']
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [
          // Don't remove XML declaration (needed to avoid errors creating PNG on Win 7)
          { removeXMLProcInst: false }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>svgicons',
          src: ['*.svg'],
          dest: '<%= meta.assets %>svgicons/min'
        }, {
          expand: true,
          cwd: '<%= meta.assets %>images/svg',
          src: ['*.svg'],
          dest: '<%= meta.build %>images/svg'
        }]
      }
    },
    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>svgicons/min',
          src: ['*.svg', '*.png'],
          dest: '<%= meta.build %>icons/'
        }],
        options: {
          enhanceSVG: true,
          colors: {
            blue: '#0b446e',
            gold: '#aba584'
          },
          customselectors: {
            'next': ['.icon-prev', '.card-heading:after'],
            'next-gold': ['.slick-next:before', '.slick-prev:before', '.breadcrumb a:before', '.static-list li:before'],
            'tick': ['.tick-list:before'],
            'caret': ['.icon-caret-up', '.filtering-controls-form .handle:after'],
            'caret-white': ['.tabs .tab-active:before']
          }
        }
      }
    },
    copy: {
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: ['**/*', '!*.jade'],
          dest: '<%= meta.build %>data/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: ['**/*', '!svg/'], //SVG files processed by svgmin
          dest: '<%= meta.build %>images/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**/*',
          dest: '<%= meta.build %>'
        }]
      },      
      video: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>video/',
          src: '**/*',
          dest: '<%= meta.build %>video/'
        }]
      },
      audio: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>audio/',
          src: '**/*',
          dest: '<%= meta.build %>audio/'
        }]
      },
      xml: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>xml/',
          src: '**/*',
          dest: '<%= meta.build %>xml/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**/*',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      htaccess: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>htaccess/',
          src: '.htaccess',
          dest: '<%= meta.build %>'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= meta.build %>css/style.css']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: ['<%= meta.build %>*.html']
    },
    watch: {
      options: {
        spawn: false,
        interrupt: true
      },
      js: {
        files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js'],
        //tasks: ['jshint', 'concat']
        tasks: ['concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      data: {
        files: ['<%= meta.views %>data/**/*.*'],
        tasks: ['copy:data']
      },
      less: {
        files: ['<%= meta.assets %>css/**/*.less'],
        tasks: ['less', 'autoprefixer', 'csslint']
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**/*'],
        tasks: ['copy:fonts']
      },
      images: {
        files: ['<%= meta.assets %>images/**/*'],
        tasks: ['copy:images']
      },
      videos: {
        files: ['<%= meta.assets %>videos/**/*'],
        tasks: ['copy:videos']
      },
      xml: {
        files: ['<%= meta.assets %>xml/**/*'],
        tasks: ['copy:xml']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '<%= meta.banner %>',
        keepSpecialComments: false,
        compatibility: 'ie8'
      },
      compress: {
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css',
          '<%= meta.build %>css/bootstrap.css': '<%= meta.build %>css/bootstrap.css',
          '<%= meta.build %>css/ie.css': '<%= meta.build %>css/ie.css',
          '<%= meta.build %>css/print.css': '<%= meta.build %>css/print.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        warning: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/script-min.js': '<%= meta.build %>js/script.js'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },
    markdownpdf: {
      options: {
        concatFiles: true
      },
      files: {
        src: ['*.md', '!README.md'],
        dest: '<%= meta.build %>'
      }
    },
    nodemon: {
      options: {
        ignore: ['node_modules/**', '<%= meta.assets %>js/**'],
        ext: 'js'
      },
      dev: {
        script: 'source/server.js'
      }
    },
    concurrent: {
      options: {
        limit: 2
      },
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    qunit: {
      options: {
        timeout: 10000,
        '--cookies-file': 'test/cookies.txt'
      },
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/test.html'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    clean: {
      build: ['public']
    }
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  //grunt.registerTask('build', ['clean', 'concat', 'less', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'jshint', 'csslint']);
  grunt.registerTask('icons', ['svgmin', 'grunticon:myIcons']);
  grunt.registerTask('build', ['clean', 'concat', 'less', 'jade', 'icons', 'copy', 'autoprefixer', 'htmlhint', 'csslint']);
  grunt.registerTask('default', ['build', 'concurrent:dev']);
  grunt.registerTask('test', ['connect:server', 'qunit']);
  grunt.registerTask('pdf', ['markdownpdf']);
  grunt.registerTask('release', ['build', 'test', 'uglify', 'cssmin']);

};

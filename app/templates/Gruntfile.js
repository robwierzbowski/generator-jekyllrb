// Big questions: what's up with .tmp + middleware
// where to compile site to: site or tmp? Follow pattern of other preprocessors?

// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
// Based on new generator-webapp
'use strict';

var LIVERELOAD_PORT = 35729;
// Insert livereload snippet with middleware
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
// RWRW Used in connect task
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  ///////////////////////////////////////////////////////////
  // Configuration

  // Configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    css: '<%= cssDir %>',
    cssPre: '<%= cssPreDir %>',
    js: '<%= jsDir %>',
    jsPre: '<%= jsPreDir %>',
    img: '<%= imgDir %>'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('package.json'),
    jek: grunt.file.readYAML('_config.yml'),

    watch: {
      options: {
        nospawn: true
      },
      // coffee: {
      //   files: ['<%%= yeoman.app %>/<%%= yeoman.jsPre %>/**/*.coffee'],
      //   tasks: ['coffee:dist']
      // },
      // What is this?
      // coffeeTest: {
      //   files: ['test/spec/**/*.coffee'],
      //   tasks: ['coffee:test']
      // },
      sass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },
      compass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },
      coffee: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.jsPre %>/**/*.coffee'],
        tasks: ['coffee:server']
      },
      jekyll: {
        files: ['<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}'],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '{.tmp,<%%= yeoman.app %>}/**/*.html',
          '{.tmp,<%%= yeoman.app %>}/<%%= yeoman.css %>/**/*.css',
          '{.tmp,<%%= yeoman.app %>}/<%%= js %>/**/*.js',
          '<%%= yeoman.app %>/<%%= yeoman.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '*' to access the server from outside.
        hostname: 'localhost'
      },
      // RWRW Three optons to create server, but what happens if you just run connect?
      // Makes sense one for each, maybe you can only run connect:x
      livereload: {
        options: {
          middleware: function (connect) {
            return [
            mountFolder(connect, '.tmp'),
            mountFolder(connect, yeomanConfig.app),
            lrSnippet];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
            mountFolder(connect, '.tmp'),
            mountFolder(connect, 'test')];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
            mountFolder(connect, yeomanConfig.dist)];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*']
        }]
      },
      server: '.tmp'
    },


    // Sass
    sass: {
      options: {
        bundleExec: true,
        style: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        loadPath: 'app/components',
      },
      files: {
        '.tmp/<%%= yeoman.css %>': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>'
      },
      dist: {
        options: {
          debugInfo: false,
          lineNumbers: false
        }
      },
      server: {}
    },

    // Compass
    compass: {
      options: {
        bundleExec: true,
        config: 'config.rb',
        sassDir: '<%%= yeoman.app %>/<%%= yeoman.cssPre %>',
        cssDir: '.tmp/<%%= yeoman.css %>',
        imagesDir: '<%%= yeoman.app %>/<%%= yeoman.img %>',
        generatedImagesDir: '.tmp/<%%= yeoman.img %>/generated',
        httpImagesPath: '/<%%= yeoman.img %>',
        httpGeneratedImagesPath: '/<%%= yeoman.img %>/generated',
        fontsDir: '<%%= yeoman.app %>/webfonts',
        javascriptsDir: '<%%= yeoman.app %>/<%%= js %>',
        relativeAssets: false
      },
      dist: {
        options: {
          debugInfo: false
        }
      },
      server: {}
    },

    // Jekyll
    jekyll: {
      options: {
        src : '<%%= yeoman.app %>',
        dest: '.tmp',
        server : false,
        auto : false,
        config: '_config.yml'
      },
      server : {},
      dist: {
        options: {
          config: '_config.yml,_config.build.yml'
          // Not seeing good documentation on what the correct format is here
          // config: '_config.yml _config.build.yml'
        }
      }
    },




// Read jade tssk for insight

// RWRW Set up basic coffee task,
// Usemin. Post question -- usemin cascade or what? use case
// Test gruntfile.





    // Coffee
    // add node js-> coffee, convert like sass.


    // Usemin





// WEBAPP ///////////////////////////////////////////////////////////



    // jshint: {
    //   options: {
    //     jshintrc: '.jshintrc'
    //   },
    //   all: [
    //     'Gruntfile.js',
    //     '<%%= yeoman.app %>/scripts/{,*/}*.js',
    //     '!<%%= yeoman.app %>/scripts/vendor/*',
    //     'test/spec/{,*/}*.js']
    // },
    // <%
    // if (testFramework === 'mocha') { %> mocha: {
    //     all: {
    //       options: {
    //         run: true,
    //         urls: ['http://localhost:<%%= connect.options.port %>/index.html']
    //       }
    //     }
    //   },
    //   <%
    // } else if (testFramework === 'jasmine') { %> jasmine: {
    //     all: {
    //       options: {
    //         specs: 'test/spec/{,*/}*.js'
    //       }
    //     }
    //   },
    //   <%
    // } %>
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },


    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
            dist: {}
        },*/
    <%
    if (includeRequireJS) { %> requirejs: {
        dist: {
          // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
          options: {
            // `name` and `out` is set by grunt-usemin
            baseUrl: yeomanConfig.app + '/scripts',
            optimize: 'none',
            // TODO: Figure out how to make sourcemaps work with grunt-usemin
            // https://github.com/yeoman/grunt-usemin/issues/30
            //generateSourceMaps: true,
            // required to support SourceMaps
            // http://requirejs.org/docs/errors.html#sourcemapcomments
            preserveLicenseComments: false,
            useStrict: true,
            wrap: true
            //uglify2: {} // https://github.com/mishoo/UglifyJS2
          }
        }
      },
      <%
    } else { %>
      // not enabled since usemin task does concat and uglify
      // check index.html to edit your build targets
      // enable this task if you prefer defining your build targets here
      /*uglify: {
            dist: {}
        },*/
      <%
    } %> rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/styles/fonts/*']
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%%= yeoman.dist %>']
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/styles/**/*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%%= yeoman.app %>/styles/{,*/}*.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*']
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yeoman.dist %>/images',
          src: [
            'generated/*']
        }]
      }
    },
    concurrent: {
      server: [
        'coffee:dist',
        'compass:server'],
      test: [
        'coffee',
        'compass'],
      dist: [
        'coffee',
        'compass:dist',
        'imagemin',
        'svgmin',
        'htmlmin']
    } <%
    if (includeRequireJS) { %> ,
      bower: {
        options: {
          exclude: ['modernizr']
        },
        all: {
          rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
        }
      } <%
    } %>
  });


  ///////////////////////////////////////////////////////////
  // Load plugins

  // Load all grunt task plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // grunt.registerTask('jekyll', 'Compile jekyll with default config (in _config.yml)', task({
  //   command: 'bundle exec jekyll'
  // }));

  // grunt.registerTask('jekyll-compile', 'Runs jekyll in no-server mode, compiling to _site', task({
  //   command: 'bundle exec jekyll --no-server --no-auto'
  // }));
  // grunt.registerTask('jekyll-help', 'Outputs Jekyll help output', task({
  //   command: 'bundle exec jekyll --help'
  // }));


  ///////////////////////////////////////////////////////////
  // Task lists


// WEBAPP ///////////////////////////////////////////////////////////


     grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test', <%
  if (testFramework === 'mocha') { %>
      'mocha' <%
  } else if (testFramework === 'jasmine') { %>
      'jasmine' <%
  } %> ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist', <%
  if (includeRequireJS) { %>
      'requirejs', <%
  } %>
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'rev',
    'usemin']);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build']);
};


// OLD ///////////////////////////////////////////////////////////

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'mocha']);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist', <%
  if (includeRequireJS) { %>
      'requirejs', <%
  } %>
    'concat',
    'uglify',
    'copy',
    'rev',
    'usemin']);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build']);
};

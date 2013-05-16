// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>. Yo Jekyll!
'use strict';

var LIVERELOAD_PORT = 35729;
// Insert livereload snippet with middleware
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
// RWRW Used in connect task
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

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
    img: '<%= imgDir %>',
    fonts: '<%= fontsDir %>'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('package.json'),
    jek: grunt.file.readYAML('_config.yml'),

    watch: {
      // coffee: {
      //   files: ['<%%= yeoman.app %>/<%%= yeoman.jsPre %>/**/*.coffee'],
      //   tasks: ['coffee:dist']
      // },

      options: {
        nospawn: true
      },
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
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
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
        fontsDir: '<%%= yeoman.app %>/<%%= yeoman.fonts %>',
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

    // Coffeescript. Needs to be tested by someone who actually uses it.
    // TODO:
    // add node js-> coffee, convert like sass.
    // npm install js2coffee
    // js2coffee file.js > file.coffee

    coffee: {
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.jsPre %>',
          src: '**/*.coffee',
          dest: '.tmp/<%%= yeoman.js %>',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.jsPre %>',
          src: '**/*.coffee',
          dest: '<%%= yeoman.dist %>/<%%= yeoman.js %>',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
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

    // Cssmin and Uglify take care of concat, but still available if needed
    /*concat: {
      dist: {}
    },*/

    // useminPrepare builds a list of files to concat/uglify/minify from a
    // reference block on one html page. Point to the compiled Jekyll
    // index.html, or a custom built usemin block manifest page (hackery!).
    // ** and initializes for you the corresponding Grunt config for the concat
    // / uglify tasks when
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },
    // RWRW looks through these files and replaces references to other files
    // with their compressed versions
    // Dist to dist, act just on the compiled site
    usemin: {
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/<%%= yeoman.css %>/**/*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Called by useminPrepare
    cssmin: {
      dist: {
        options: {
          banner: '/* See the sass code that generated this file at github.com/<%= github %>/xxxxxx */',
          // report: 'gzip'
          report: 'min'
        }
        // Usemin is gathering the files. This shouldn't matter
        // files: {
        //   // '<%= yeoman.dist %>/<%%= yeoman.css %>/main.css': [
        //   //   '.tmp/<%%= yeoman.css %>/{,*/}*.css',
        //   //   '<%= yeoman.app %>/<%%= yeoman.css %>/{,*/}*.css']
        // }
      }
    },
    // Called by useminPrepare
    uglify {},

    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/<%%= yeoman.img %>',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/<%%= yeoman.img %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/<%%= yeoman.img %>',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/<%%= yeoman.img %>'
        }]
      }
    },

    // Moves files not handled by other tasks
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            // Jekyll transports all text files
            // Copy transports asset drectories and binary files
            '**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= imgDir %>',
            '<%= cssDir %>',
            '<%= jsDir %>',
            '<%= fontsDir %>']
        }]
      }
    },

    // Rev all assets
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/<%%= yeoman.js %>/**/*.js',
            '<%%= yeoman.dist %>/<%%= yeoman.cs %>/**/*.css',
            '<%%= yeoman.dist %>/<%%= yeoman.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/<%%= yeoman.fonts %>/**/*.{eot*,woff,ttf,svg}']
        }
      }
    },

    concurrent: {
      server: [
        'coffee:server',
        'sass:server',
        'compass:server',
        'jekyll:server',
        ],
      // RWRW test needs work
      // test: [
      //   'coffee',
      //   'compass'],
      dist: [
        'coffee:dist',
        'sass:dist',
        'compass:dist',
        'jekyll:dist',
        'imagemin',
        'svgmin']
    });


    // TODO: Tests and Reports

    // add csslint https://github.com/gruntjs/grunt-contrib-csslint
    // add jslint webapp config
    // add csscss
    // Custom tests for failed sass compile?


  ///////////////////////////////////////////////////////////
  // Load plugins

  // Load all grunt task plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  ///////////////////////////////////////////////////////////
  // Task lists


  // RWRW TODO: clean, task lists, package depens

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

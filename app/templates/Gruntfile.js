// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>. Yo Jekyll!
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var yeomanConfig = {
  app: 'app',
  dist: 'dist',
  css: '<%= cssDir %>',<% if (cssPre) { %>
  cssPre: '<%= cssPreDir %>',<% } %>
  js: '<%= jsDir %>',<% if (jsPre) { %>
  jsPre: '<%= jsPreDir %>',<% } %>
  img: '<%= imgDir %>',
  fonts: '<%= fontsDir %>'
};

// RWRW Usemin

// TODO:
// Add tests (js/csslint, csscss)
// Add stylus and require
// Add task to bump versions
// Add grunt-bower-install?
// Have coffeescript tested by someone that actually uses it

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        nospawn: true
      },<% if (cssPre === 'sass') { %>
      sass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },<% } %><% if (cssPre === 'compass') { %>
      compass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },<% } %><% if (jsPre === 'cofeescript') { %>
      coffee: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.jsPre %>/**/*.coffee'],
        tasks: ['coffee:server']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },<% } %>
      jekyll: {
        files: ['<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}', '!<%%= yeoman.app %>/_plugins'],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '.tmp/**/*.html',
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
      livereload: {
        options: {
          middleware: function (connect) {
            return [
            lrSnippet,
            mountFolder(connect, '.tmp'),
            mountFolder(connect, yeomanConfig.app)];
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
    },<% if (cssPre === 'sass') { %>
    sass: {
      options: {
        bundleExec: true,
        style: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        loadPath: 'app/components'
      },
      files: {
        '.tmp/<%%= yeoman.css %>': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>'
      },
      dist: {
        options: {
          debugInfo: false,
          lineNumbers: false
        },
        files: {
         '<%%= yeoman.dist %><%%= yeoman.css %>': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>'
        }
      },
      server: {}
    },<% } %><% if (cssPre === 'compass') { %>
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
          debugInfo: false,
          cssDir: '<%%= yeoman.dist %>/<%%= yeoman.css %>',
          generatedImagesDir: '.<%%= yeoman.dist %>/<%%= yeoman.img %>/generated'
        }
      },
      server: {}
    },<% } %><% if (jsPre === 'coffeescript') { %>
    coffee: {
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
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
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.jsPre %>',
          src: '**/*.coffee',
          dest: '.tmp/<%%= yeoman.js %>',
          ext: '.js'
        }]
      },
    },<% } %>
    jekyll: {
      // Config for after https://github.com/dannygarcia/grunt-jekyll/pull/14
      // options: {
      //   src : '<%%= yeoman.app %>',
      //   dest: '.tmp',
      //   server : false,
      //   auto : false,
      //   config: '_config.yml'
      // },
      // dist: {
      //   options: {
      //     dest: '<%%= yeoman.dist %>',
      //     config: '_config.yml,_config.build.yml'
      //   }
      // },
      // server: {}
      dist: {
        src : '<%%= yeoman.app %>',
        dest: '<%%= yeoman.dist %>',
        server : false,
        auto : false,
        config: '_config.yml,_config.build.yml'
      },
      server: {
        src : '<%%= yeoman.app %>',
        dest: '.tmp',
        server : false,
        auto : false,
        config: '_config.yml'
      }
    },
    // Reports
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/<%%= yeoman.js %>/**/*.js',
        '!<%%= yeoman.app %>/<%%= yeoman.js %>/vendor/**/*',
        '!<%%= yeoman.app %>/bower_components/**/*',
        'test/spec/**/*.js'],
      dist: [
        '<%%= yeoman.app %>/<%%= yeoman.js %>/**/*.js',
        '!<%%= yeoman.app %>/<%%= yeoman.js %>/vendor/**/*',
        '!<%%= yeoman.app %>/bower_components/**/*']
    },
    // Cssmin and Uglify concatinate, but concat is still available if needed
    /*concat: {
      dist: {}
    },*/
    // Note that useminPrepare will only scan one page for usemin blocks. If
    // you have usemin blocks that aren't used in index.html, create a usemin
    // manifest page (hackery!) and point the task there.
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%%= yeoman.dist %>']
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/<%%= yeoman.css %>/**/*.css']
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
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    cssmin: {
      dist: {
        options: {<% if (cssPre === 'compass') { %>
          banner: '/* See the sass code that generated this file at github.com/<%= github %>/xxxxxx */',<% } %>
          report: 'min' // 'gzip'
        }
        // files: {
        //   '<%%= yeoman.dist %>/<%%= yeoman.css %>/main.css': [
        //     '.tmp/<%%= yeoman.css %>/{,*/}*.css',
        //     '<%%= yeoman.app %>/<%%= yeoman.css %>/{,*/}*.css']
        // }
      }
    },
    uglify: {},
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.img %>',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/<%%= yeoman.img %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.img %>',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/<%%= yeoman.img %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            // Jekyll transports all html files
            // Copy transports image files and asset drectories
            // If your site requires it, add other file type patterns here
            '**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= imgDir %>',
            '<%= cssDir %>',
            '<%= jsDir %>',
            '<%= fontsDir %>']
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/<%%= yeoman.js %>/**/*.js',
            '<%%= yeoman.dist %>/<%%= yeoman.css %>/**/*.css',
            '<%%= yeoman.dist %>/<%%= yeoman.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/<%%= yeoman.fonts %>/**/*.{eot*,woff,ttf,svg}']
        }
      }
    },
    concurrent: {
      server: [<% if (cssPre === 'sass') { %>
        'sass:server',<% } %><% if (cssPre === 'compass') { %>
        'compass:server',<% } %><% if (jsPre === 'coffee') { %>
        'coffee:server',<% } %>
        'jekyll:server'
        ],
      // test: [
      //   'coffee',
      //   'compass'],
      dist: [<% if (cssPre === 'sass') { %>
        'sass:dist',<% } %><% if (cssPre === 'compass') { %>
        'compass:dist',<% } %><% if (jsPre === 'coffee') { %>
        'coffee:dist',<% } %>
        'jekyll:dist',
        'imagemin',
        'svgmin']
    }
  });

  // Load plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Define Tasks
  grunt.registerTask('server', function (target) {
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

  // grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test',
  //   'mocha']);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'concurrent:dist',
    'useminPrepare',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('default', [
    'jshint',
    // 'test',
    'build']);
};

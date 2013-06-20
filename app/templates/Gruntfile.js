// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>. Yo Jekyll!
'use strict';
var liveReloadPort = 35729;
var lrSnippet = require('connect-livereload')({port: liveReloadPort});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var yeomanConfig = {
  app: 'app',
  dist: 'dist'
};

// Directory reference:
//   css: <%= cssDir %><% if (cssPre) { %>
//   <%= cssPre %>: <%= cssPreDir %><% } %>
//   javascript: <%= jsDir %><% if (jsPre) { %>
//   <%= jsPre %>: <%= jsPreDir %><% } %>
//   images: <%= imgDir %>
//   fonts: <%= fontsDir %>

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    yeoman: yeomanConfig,

    watch: {<% if (cssPre === 'sass') { %>
      sass: {
        files: ['<%%= yeoman.app %>/<%= cssPreDir %>/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },<% } %><% if (cssPre === 'compass') { %>
      compass: {
        files: ['<%%= yeoman.app %>/<%= cssPreDir %>/**/*.{scss,sass}'],
        tasks: ['compass:server'<% if (autoPre) { %>, 'autoprefixer:server'<% } %>]
      },<% } %><% if (autoPre) { %>
      prefixCss: {
        files: ['<%%= yeoman.app %>/<%= cssDir %>/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },<% } %><% if (jsPre === 'coffeescript') { %>
      coffee: {
        files: ['<%%= yeoman.app %>/<%= jsPreDir %>/**/*.coffee'],
        tasks: ['coffee:server']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },<% } %>
      jekyll: {
        files: ['<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
                '_config.yml',
                '!<%%= yeoman.app %>/bower_components'],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: liveReloadPort
        },
        files: [
          '.jekyll/**/*.html',<% if (autoPre) { %>
          '.tmp/<%= cssDir %>/**/*.css',<% } else { %>
          '{.tmp,<%%= yeoman.app %>}/<%= cssDir %>/**/*.css',<% } %>
          '{.tmp,<%%= yeoman.app %>}/<%%= js %>/**/*.js',
          '<%%= yeoman.app %>/<%= imgDir %>/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change hostname to null to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '.jekyll'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    // Running Jekyll also cleans all non-git files from the target directory
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: ['.tmp', '.jekyll']
    },<% if (cssPre === 'sass') { %>
    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false,
        loadPath: 'app/bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreDir %>',
          src: '**/*.{scss,sass}',
          dest: '.tmp/<%= cssDir %>',
          filter: 'isFile',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreDir %>',
          src: '**/*.{scss,sass}',
          dest: '.tmp/<%= cssDir %>',
          filter: 'isFile',
          ext: '.css'
        }]
      }
    },<% } %><% if (cssPre === 'compass') { %>
    compass: {
      options: {
        // If you're using global Sass gems, require them here, e.g.:
        // require: ['singularity', 'jacket'],
        bundleExec: true,
        sassDir: '<%%= yeoman.app %>/<%= cssPreDir %>',
        cssDir: '.tmp/<%= cssDir %>',
        imagesDir: '<%%= yeoman.app %>/<%= imgDir %>',
        fontsDir: '<%%= yeoman.app %>/<%= fontsDir %>',
        javascriptsDir: '<%%= yeoman.app %>/<%= jsDir %>',
        relativeAssets: false,
        httpImagesPath: '/<%= imgDir %>',
        httpGeneratedImagesPath: '/<%= imgDir %>/generated',
        outputStyle: 'expanded',
        raw: 'asset_cache_buster :none \nextensions_dir = "<%%= yeoman.app %>/bower_components"\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/<%= imgDir %>/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          generatedImagesDir: '.tmp/<%= imgDir %>/generated'
        }
      }
    },<% } %><% if (autoPre) { %>
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>/<%= cssDir %>',
          src: '**/*.css',
          dest: '<%%= yeoman.dist %>/<%= cssDir %>'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/<%= cssDir %>',
          src: '**/*.css',
          dest: '.tmp/<%= cssDir %>'
        }]
      }
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
          cwd: '<%%= yeoman.app %>/<%= jsPreDir %>',
          src: '**/*.coffee',
          dest: '.tmp/<%= jsDir %>',
          ext: '.js'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= jsPreDir %>',
          src: '**/*.coffee',
          dest: '.tmp/<%= jsDir %>',
          ext: '.js'
        }]
      }
    },<% } %>
    jekyll: {
      // TODO: switch config to options style after
      // https://github.com/dannygarcia/grunt-jekyll/pull/14
      dist: {
        bundleExec: true,
        src : '<%%= yeoman.app %>',
        dest: '<%%= yeoman.dist %>',
        server : false,
        auto : false,
        config: '_config.yml,_config.build.yml'
      },
      server: {
        bundleExec: true,
        src : '<%%= yeoman.app %>',
        dest: '.jekyll',
        server : false,
        auto : false,
        config: '_config.yml'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '{.tmp,<%%= yeoman.app %>}/<%= jsDir %>/**/*.js',
        'test/spec/**/*.js',
        '!<%%= yeoman.app %>/<%= jsDir %>/vendor/**/*',
        '!<%%= yeoman.app %>/bower_components/**/*'
      ],
      report: [
        '{.tmp,<%%= yeoman.app %>}/<%= jsDir %>/**/*.js',
        '!<%%= yeoman.app %>/<%= jsDir %>/vendor/**/*'
      ]
    },
    csscss: {
      options: {
        bundleExec: true,
        minMatch: 2,<% if (cssPre === 'compass' || cssPre === 'sass') { %>
        ignoreSassMixins: false,<% } %><% if (cssPre === 'compass') { %>
        compass: true,<% } %><% if (!cssPre) { %>
        showParserErrors: true,<% } %>
        colorize: true,
        shorthand: false,
        verbose: true
      },
      // Add files to be tested here
      report: {
       src: ['<%%= yeoman.app %>/<%= cssDir %>/**/*.css'<% if (cssPre === 'compass' || cssPre === 'sass') { %>,
             '<%%= yeoman.app %>/<%= cssPreDir %>/**/*.scss'<% } %>]
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      report: {
        src: ['{.tmp,<%%= yeoman.app %>}/<%= cssDir %>/**/*.css']
      }
    },
    // UseminPrepare will only scan one page for usemin blocks. If you have
    // usemin blocks that aren't used in index.html, create a usemin manifest
    // page (hackery!) and point this task there.
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
          basedir: '<%%= yeoman.dist %>',
          dirs: ['<%%= yeoman.dist %>/**/*']
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/<%= cssDir %>/**/*.css']
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
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          report: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          src: [
            // Jekyll moves all html and text files. Usemin moves css and js
            // files with concat. Add other files and patterns your site
            // reqires for distrobution here, e.g., Bower components that
            // aren't in a usemin block.
            <% if (!h5bpJs) { %>// <% } %>'bower_components/jquery.min.js',
            // Copy moves asset files and directories
            '*.{ico,png}',
            '<%= imgDir %>/**/*',
            '<%= fontsDir %>/**/*'
          ],
          dest: '<%%= yeoman.dist %>'
        }]
      }<% if (autoPre) { %>,
      // Copy css into .tmp directory for processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/<%= cssDir %>',
          src: '**/*.css',
          dest: '.tmp/<%= cssDir %>'
        }]
      }<% } %>
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/<%= jsDir %>/**/*.js',
            '<%%= yeoman.dist %>/<%= cssDir %>/**/*.css',
            '<%%= yeoman.dist %>/<%= imgDir %>/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%%= yeoman.dist %>/<%= fontsDir %>/**/*.{eot*,svg,ttf,woff}'
          ]
        }
      }
    },
    concurrent: {
      server: [<% if (cssPre === 'sass') { %>
        'sass:server',<% } %><% if (cssPre === 'compass') { %>
        'compass:server',<% } %><% if (jsPre === 'coffeescript') { %>
        'coffee:server',<% } %><% if (autoPre) { %>
        'copy:stageCss',<% } %>
        'jekyll:server'
      ],
      dist: [<% if (cssPre === 'sass') { %>
        'sass:dist',<% } %><% if (cssPre === 'compass') { %>
        'compass:dist',<% } %><% if (jsPre === 'coffeescript') { %>
        'coffee:dist',<% } %>
        'copy:dist'
      ]
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
      'concurrent:server',<% if (autoPre) { %>
      'autoprefixer:server',<% } %>
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  // No real tests yet. Add your own.
  // grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test'
  // ]);

  grunt.registerTask('report', [
    'clean:server',<% if (cssPre === 'sass') { %>
    'sass:server',<% } %><% if (cssPre === 'compass') { %>
    'compass:server',<% } %><% if (jsPre === 'coffeescript') { %>
    'coffee:server',<% } %>
    'jshint:report',
    'csscss:report',
    'csslint:report'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    // Jekyll cleans all non-git files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',<% if (autoPre) { %>
    'autoprefixer:dist',<% } %>
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'rev',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('default', [
    'report',
    'build'
  ]);
};

// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// Directory reference:
//   css: <%= cssDir %><% if (cssPre) { %>
//   <%= cssPre %>: <%= cssPreDir %><% } %>
//   javascript: <%= jsDir %><% if (jsPre) { %>
//   <%= jsPre %>: <%= jsPreDir %><% } %>
//   images: <%= imgDir %>
//   fonts: <%= fontsDir %>

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {<% if (cssPre === 'sass' || cssPre === 'compass' ) { %>
      <%= cssPre %>: {
        files: ['<%%= yeoman.app %>/<%= cssPreDir %>/**/*.{scss,sass}'],
        tasks: ['<%= cssPre %>:server'<% if (autoPre) { %>, 'autoprefixer:dist'<% } %>]
      },<% } %><% if (autoPre) { %>
      autoprefixer: {
        files: ['<%%= yeoman.app %>/<%= cssDir %>/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:dist']
      },<% } %><% if (jsPre === 'coffeescript') { %>
      coffee: {
        files: ['<%%= yeoman.app %>/<%= jsPreDir %>/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },<% } %>
      jekyll: {
        files: [
          '<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%%= yeoman.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,<%= yeoman.app %>}/<%= jsDir %>/**/*.js',
            '{<%= yeoman.app %>}/_bower_components/**/*.js',
            '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              ".jekyll",
              ".tmp",
              "<%= yeoman.app %>"
            ]
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: "<%= yeoman.dist %>"
          }
        }
      },
      test: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,<%= yeoman.app %>}/<%= jsDir %>/**/*.js',
            '{<%= yeoman.app %>}/_bower_components/**/*.js',
            '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              ".jekyll",
              ".tmp",
              "<%= yeoman.app %>"
            ]
          },
          watchTask: true
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },<% if (cssPre === 'sass') { %>
    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false,
        loadPath: 'app/_bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreDir %>',
          src: '**/*.{scss,sass}',
          dest: '.tmp/<%= cssDir %>',
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
          ext: '.css'
        }]
      }
    },<% } %><% if (cssPre === 'compass') { %>
    compass: {
      options: {
        // If you're using global Sass gems, require them here.
        // require: ['singularity', 'jacket'],
        bundleExec: true,
        sassDir: '<%%= yeoman.app %>/<%= cssPreDir %>',
        cssDir: '.tmp/<%= cssDir %>',
        imagesDir: '<%%= yeoman.app %>/<%= imgDir %>',
        javascriptsDir: '<%%= yeoman.app %>/<%= jsDir %>',
        relativeAssets: false,
        httpImagesPath: '/<%= imgDir %>',
        httpGeneratedImagesPath: '/<%= imgDir %>/generated',
        outputStyle: 'expanded',
        raw: 'extensions_dir = "<%%= yeoman.app %>/_bower_components"\n'
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
        expand: true,
        cwd: '.tmp',
        src: '**/{<%= cssDir %>,concat}/*.css',
        dest: '.tmp'
      }
    },<% } %><% if (jsPre === 'coffeescript') { %>
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= jsPreDir %>',
          src: '**/*.coffee',
          dest: '.tmp/<%= jsDir %>',
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
    },<% } %>
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%%= yeoman.dist %>', '<%%= yeoman.dist %>/<%= imgDir %>']
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
          removeRedundantAttributes: true
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
          check: 'gzip'
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
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            '<%= imgDir %>/**/*',
            '<%= fontsDir %>/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}'<% if (h5bpJs) { %>,<% } %>
            // Explicitly add any files your site needs for distribution here.
            <% if (!h5bpJs) { %>//<% } %>'_bower_components/jquery/jquery.min.js',
            <% if (!h5bpJs) { %>//<% } %>'favicon.ico',
            <% if (!h5bpJs) { %>//<% } %>'apple-touch*.png'
          ],
          dest: '<%%= yeoman.dist %>'
        }]
      }<% if (autoPre) { %>,
      // Copy CSS into .tmp directory for Autoprefixer processing
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
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%%= yeoman.dist %>/<%= jsDir %>/**/*.js',
            '<%%= yeoman.dist %>/<%= cssDir %>/**/*.css',
            '<%%= yeoman.dist %>/<%= imgDir %>/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%%= yeoman.dist %>/<%= fontsDir %>/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },<% if (deploy) { %>
    buildcontrol: {
      dist: {
        options: {
          remote: '<%= deployRemote %>',
          branch: '<%= deployBranch %>',
          commit: true,
          push: true
        }
      }
    },<% } %><% if (jsPre === 'coffeescript') { %>
    coffeelint: {
      options: {
        'max_line_length': {
          'level': 'ignore'
        }
      },
      check: ['<%%= yeoman.app %>/<%= jsPreDir %>/*.coffee']
    },<% } %>
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/<%= jsDir %>/**/*.js',
        'test/spec/**/*.js'
      ]
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%%= yeoman.app %>/<%= cssDir %>/**/*.css'
        ]
      }
    },
    concurrent: {
      server: [<% if (cssPre === 'sass') { %>
        'sass:server',<% } %><% if (cssPre === 'compass') { %>
        'compass:server',<% } %><% if (jsPre === 'coffeescript') { %>
        'coffee:dist',<% } %><% if (autoPre) { %>
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

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',<% if (autoPre) { %>
      'autoprefixer:dist',<% } %>
      'browserSync:server',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'browserSync:test'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',<% if (cssPre === 'sass') { %>
    'sass:server',<% } %><% if (cssPre === 'compass') { %>
    'compass:server',<% } %><% if (jsPre === 'coffeescript') { %>
    'coffeelint:check',
    'coffee:dist',<% } %>
    'jshint:all',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',<% if (autoPre) { %>
    'autoprefixer:dist',<% } %>
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin',
    'htmlmin'
    ]);<% if (deploy) { %>

  grunt.registerTask('deploy', [
    'check',
    'test',
    'build',
    'buildcontrol'
    ]);<% } %>

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};

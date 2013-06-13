'use strict';
var util = require('util');
var path = require('path');
var globule = require('globule');
var shelljs = require('shelljs');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  // Exit if Ruby dependencies aren't installed
  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  if (!dependenciesInstalled) {
    console.log('Looks like you\'re missing some dependencies.' +
      '\nMake sure ' + 'Ruby'.white + ' and the ' + 'Bundler gem'.white + ' are installed, then run again.');
    shelljs.exit(1);
  }

  // Get static info for templating
  this.appname = path.basename(process.cwd());
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.gitInfo = {
    name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
    email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, ''),
    github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, ''),
  };

  this.on('end', function () {

    // Clean up temp files
    spawn('rm', ['-r', '.jekyll'], { stdio: 'inherit' });

    // Install Grunt and Bower dependencies
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(Generator, yeoman.generators.Base);

// User input
Generator.prototype.askForAuthor = function askForAuthor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
  '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
  '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __'+'\'.___.\''.yellow+'__' +
  '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n';

  console.log(welcome);
  console.log('This generator will scaffold and wire a Jekyll site. Yo, Jekyllrb!'.yellow.bold +
    '\n\nTell us a little about yourself.'.yellow + ' ☛');

  var prompts = [{
    name: 'author',
    message: 'Name',
    default: this.gitInfo.name
  },
  {
    name: 'email',
    message: 'Email',
    default: this.gitInfo.email
  },
  {
    name: 'github',
    message: 'GitHub Username',
    default: this.gitInfo.github
  },
  {
    name: 'twitter',
    message: 'Twitter Username',
    default: '@' + this.gitInfo.github
  }];

  this.prompt(prompts, function (props) {

    this.author  = props.author;
    this.email   = props.email;
    this.github  = props.github;
    this.twitter = props.twitter[0] === '@' ? props.twitter.substr(1) : props.twitter;

    cb();
  }.bind(this));
};

Generator.prototype.askForTools = function askForTools() {
  var cb = this.async();

  console.log('\nWire tools and preprocessors.'.yellow + ' ☛');

  var prompts = [{
    name: 'cssPre',
    type: 'list',
    message: 'Use a css preprocessor?',
    choices: ['None', 'Sass', 'Compass']
  },
  {
    name: 'autoPre',
    type: 'confirm',
    message: 'Use Autoprefixer?'
  },
  {
    name: 'jsPre',
    type: 'list',
    message: 'Use a javascript preprocessor?',
    choices: ['None', 'Coffeescript'],
  }];

  this.prompt(prompts, function (props) {

    // Multiple choice 'none' to false
    this.cssPre  = props.cssPre === 'None' ? false : props.cssPre.toLowerCase();
    this.jsPre   = props.jsPre === 'None' ? false : props.jsPre.toLowerCase();
    this.autoPre = props.autoPre;

    cb();
  }.bind(this));
};

Generator.prototype.askForStructure = function askForStructure() {
  var cb = this.async();

  console.log('\nSet up some directories.'.yellow + ' ☛' +
    '\nNested directories are fine.');

  var slashFilter = function (input) {
    return input.replace(/^\/*|\/*$/g, '');
  };

  var prompts = [{
    name: 'cssDir',
    message: 'Choose a css directory',
    default: 'css',
    filter: slashFilter
  },
  {
    name: 'jsDir',
    message: 'Choose a javascript directory',
    default: 'js',
    filter: slashFilter
  },
  {
    name: 'imgDir',
    message: 'Choose an image file directory',
    default: 'image',
    filter: slashFilter
  },
  {
    name: 'fontsDir',
    message: 'Choose a webfonts directory',
    default: 'fonts',
    filter: slashFilter
  }];
  var cssPreDirPrompt = {
    name: 'cssPreDir',
    message: 'Choose a css preprocessor directory',
    default: '_scss',
    filter: slashFilter
  };
  var jsPreDirPrompt = {
    name: 'jsPreDir',
    message: 'Choose a javascript preprocessor directory',
    default: '_src',
    filter: slashFilter
  };

  if (this.cssPre) {
    prompts.push(cssPreDirPrompt);
  }
  if (this.jsPre) {
    prompts.push(jsPreDirPrompt);
  }

  this.prompt(prompts, function (props) {

    this.cssDir    = props.cssDir;
    this.jsDir     = props.jsDir;
    this.imgDir    = props.imgDir;
    this.fontsDir  = props.fontsDir;
    this.cssPreDir = props.cssPreDir;
    this.jsPreDir  = props.jsPreDir;

    cb();
  }.bind(this));
};

Generator.prototype.askForTemplates = function askForTemplates() {
  var cb = this.async();

  console.log('\nChoose a template.'.yellow + ' ☛');

  var prompts = [{
    name: 'templateType',
    type: 'list',
    message: 'Choose a Jekyll site template',
    choices: ['Default Jekyll', 'HTML5 ★ Boilerplate']
  }];

  this.prompt(prompts, function (props) {

    if (props.templateType === 'Default Jekyll') {
      this.templateType = 'default';
    }
    else if (props.templateType === 'HTML5 ★ Boilerplate') {
      this.templateType = 'h5bp';
    }

    cb();
  }.bind(this));
};

Generator.prototype.askForh5bp = function askForh5bp() {
  if (this.templateType === 'h5bp') {
    var cb = this.async();

    var prompts = [{
      name: 'h5bpCss',
      type: 'confirm',
      message: 'Add H5★BP css files?'
    },
    {
      name: 'h5bpJs',
      type: 'confirm',
      message: 'Add H5★BP javascript files?',
    },
    {
      name: 'h5bpIco',
      type: 'confirm',
      message: 'Add H5★BP favorite and touch icons?'
    },
    {
      name: 'h5bpDocs',
      type: 'confirm',
      message: 'Add H5★BP documentation?'
    },
    {
      name: 'h5bpAnalytics',
      type: 'confirm',
      message: 'Include Google Analytics?'
    }];

    this.prompt(prompts, function (props) {

      this.h5bpCss       = props.h5bpCss;
      this.h5bpJs        = props.h5bpJs;
      this.h5bpIco       = props.h5bpIco;
      this.h5bpDocs      = props.h5bpDocs;
      this.h5bpAnalytics = props.h5bpAnalytics;

      cb();
    }.bind(this));
  }
  else {
    this.h5bpCss       = false;
    this.h5bpJs        = false;
    this.h5bpIco       = false;
    this.h5bpDocs      = false;
    this.h5bpAnalytics = false;
  }
};

Generator.prototype.askForJekyll = function askForJekyll() {
  var cb = this.async();

  console.log('\nAnd configure Jekyll.'.yellow + ' ☛' +
              '\nYou can change all of these options in Jekyll\'s _config.yml.');

  var prompts = [{
    name: 'jekDescript',
    message: 'Site Description'
  },
  {
    name: 'jekPost',
    type: 'list',
    message: 'Choose a post permalink style',
    choices: ['date', 'pretty', 'none']
  },
  {
    name: 'jekMkd',
    type: 'list',
    message: 'Markdown library',
    choices: ['maruku', 'rdiscount', 'kramdown', 'redcarpet']
  },
  {
    name: 'jekPyg',
    type: 'confirm',
    message: 'Use the Pygments code highlighting library?'
  },
  {
    name: 'jekPage',
    message: 'How many posts should be shown on the home page?',
    default: 'all',
    validate: function (input) {
      if (/^[0-9]*$/.test(input)) {
        return true;
      }
      if (/^all*$/i.test(input)) {
        return true;
      }
      return 'Must be a number or \'all\'';
    }
  }];

  this.prompt(prompts, function (props) {

    this.jekPyg      = props.jekPyg;
    this.jekMkd      = props.jekMkd;
    this.jekPost     = props.jekPost;
    this.jekDescript = props.jekDescript;
    this.jekPage     = /^all$/i.test(props.jekPage) ? false : props.jekPage;

    cb();
  }.bind(this));
};

// Generate App
Generator.prototype.rubyDependencies = function rubyDependencies() {
  this.template('Gemfile');
  this.conflicter.resolve(function (err) {
    if (err) {
      return this.emit('error', err);
    }
    shelljs.exec('bundle install');
  });
};

Generator.prototype.git = function git() {
  this.template('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.csslint = function csslint() {
  this.template('csslintrc', '.csslintrc');
};

Generator.prototype.editor = function editor() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.directories = function directories() {

  // Scaffold Jekyll dirs
  this.mkdir(path.join('app', this.cssDir));
  this.mkdir(path.join('app', this.jsDir));
  this.mkdir(path.join('app', this.imgDir));
  this.mkdir(path.join('app', this.fontsDir));
  this.mkdir('app/_layouts');
  this.mkdir('app/_posts');
  this.mkdir('app/_includes');
  this.mkdir('app/_plugins');
};

Generator.prototype.jekyllInit = function jekyllInit() {

  // Create a default Jekyll site in a temporary folder
  this.jekTmpDir = path.join(process.cwd(), '.jekyll');
  shelljs.exec('bundle exec jekyll new ' + this.jekTmpDir);
};

Generator.prototype.jekyllFiles = function jekyllFiles() {

  // Jekyll config files
  this.copy('_config.build.yml', '_config.build.yml');
  this.template('_config.yml');

  // Pygments styles
  if (this.jekPyg) {
    this.copy(path.join(this.jekTmpDir, 'css/syntax.css'), path.join('app', this.cssDir, 'syntax.css'));
  }
};

Generator.prototype.templates = function templates() {

  // Formatted date for posts
  var date = new Date();
  var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  // Copy universal template files
  this.copy(path.join(this.jekTmpDir, '_posts', formattedDate + '-welcome-to-jekyll.markdown'), path.join('app/_posts', formattedDate + '-welcome-to-jekyll.md'));
  this.template('app/_posts/yo-jekyllrb.md', 'app/_posts/' + formattedDate + '-yo-jekyllrb.md');

  // Jekyll default template
  if (this.templateType === 'default') {

    // From cli generated template
    this.copy(path.join(this.jekTmpDir, 'index.html'), 'app/index.html');
    this.copy(path.join(this.jekTmpDir, '_layouts/post.html'), 'app/_layouts/post.html');
    this.copy(path.join(this.jekTmpDir, 'css/main.css'), path.join('app', this.cssDir, 'main.css'));

    // Yeoman tailored files from generator
    this.template('conditional/template-default/_layouts/default.html', 'app/_layouts/default.html');
    this.write(path.join('app', this.jsDir, 'main.js'), '');
  }

  // HTML5 Boilerplate template
  else if (this.templateType === 'h5bp') {
    var cb = this.async();

    // From the h5bp git repository
    this.remote('h5bp', 'html5-boilerplate', 'v4.2.0', function (err, remote) {
      if (err) {
        return cb(err);
      }

      remote.copy('.htaccess', 'app/.htaccess');
      remote.copy('404.html', 'app/404.html');
      remote.copy('crossdomain.xml', 'app/crossdomain.xml');
      remote.copy('LICENSE.md', 'app/_h5bp-docs/LICENSE.md');
      remote.copy('robots.txt', 'app/robots.txt');

      // Css boilerplate
      if (this.h5bpCss) {
        remote.directory('css', path.join('app', this.cssDir));
      }
      else {
        this.write(path.join('app', this.cssDir, 'main.css'), '');
      }

      // Js boilerplate
      // Ignore vendor diectory because we're handling components with Bower
      if (this.h5bpJs) {
        remote.copy('js/main.js', path.join('app', this.jsDir, 'main.js'));
        remote.copy('js/plugins.js', path.join('app', this.jsDir, 'plugins.js'));
      }
      else {
        this.write(path.join('app', this.jsDir, 'main.js'), '');
      }

      // Touch and favicons
      if (this.h5bpIco) {
        remote.copy('apple-touch-icon-114x114-precomposed.png', 'app/apple-touch-icon-114x114-precomposed.png');
        remote.copy('apple-touch-icon-144x144-precomposed.png', 'app/apple-touch-icon-144x144-precomposed.png');
        remote.copy('apple-touch-icon-57x57-precomposed.png', 'app/apple-touch-icon-57x57-precomposed.png');
        remote.copy('apple-touch-icon-72x72-precomposed.png', 'app/apple-touch-icon-72x72-precomposed.png');
        remote.copy('apple-touch-icon-precomposed.png', 'app/apple-touch-icon-precomposed.png');
        remote.copy('apple-touch-icon.png', 'app/apple-touch-icon.png');
        remote.copy('favicon.ico', 'app/favicon.ico');
      }

      // Docs
      if (this.h5bpDocs) {
        remote.directory('doc', 'app/_h5bp-docs/code-docs');
        remote.copy('CHANGELOG.md', 'app/_h5bp-docs/CHANGELOG.md');
        remote.copy('CONTRIBUTING.md', 'app/_h5bp-docs/CONTRIBUTING.md');
        remote.copy('README.md', 'app/_h5bp-docs/README.md');
      }

      cb();
    }.bind(this));

    // Yeoman and Jekyll tailored files from generator
    this.copy('conditional/template-h5bp/index.html', 'app/index.html');
    this.copy('conditional/template-h5bp/_layouts/post.html', 'app/_layouts/post.html');
    this.template('conditional/template-h5bp/humans.txt', 'app/humans.txt');
    this.template('conditional/template-h5bp/_includes/scripts.html', 'app/_includes/scripts.html');
    this.template('conditional/template-h5bp/_layouts/default.html', 'app/_layouts/default.html');

    // Google analytincs include
    if (this.h5bpAnalytics) {
      this.copy('conditional/template-h5bp/_includes/googleanalytics.html', 'app/_includes/googleanalytics.html');
    }
  }
};

Generator.prototype.cssPreprocessor = function cssPreprocessor() {
  if (this.cssPre) {
    this.mkdir(path.join('app', this.cssPreDir));
  }

  // Sass and Compass files
  if (['sass', 'compass'].indexOf(this.cssPre) !== -1) {

    this.template('conditional/sass-compass/readme.md', path.join('app', this.cssPreDir, 'readme.md'));

    // Move css files to scss files
    var files = globule.find('**/*.css', {srcBase: path.join('app', this.cssDir)});
    var cssDir = this.cssDir;
    var cssDir = this.cssDir;

    files.forEach(function (file) {

      this.copy(path.join(process.cwd(), 'app', cssDir, file),
                path.join('app', this.cssPreDir, file.replace(/\.css$/, '.scss')));

      // Wait until copy is completely finished, and then delete files.
      this.conflicter.resolve(function (err) {
        if (err) {
          return this.emit('error', err);
        }
        spawn('rm', [path.join('app', cssDir, file)], { stdio: 'inherit' });
      });
    }, this);
  }
};

Generator.prototype.jsPreprocessor = function jsPreprocessor() {
  if (this.jsPre) {
    this.mkdir(path.join('app', this.jsPreDir));
  }

  // Coffeescript
  if (this.jsPre === 'coffeescript') {
    this.template('conditional/coffee/readme.md', path.join('app', this.jsPreDir, 'readme.md'));
  }
};

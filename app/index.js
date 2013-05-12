'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var globule = require('globule');
var shelljs = require('shelljs');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  // Specify an appname from the command line, or use dir name
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  // Make sure Ruby dependencies are installed
  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  if (!dependenciesInstalled) {
    console.log('Looks like you\'re missing some dependencies.' +
      '\nMake sure ' + 'Ruby'.white + ' and the ' + 'Bundler gem'.white +
      ' are installed, then run again.');
    shelljs.exit(1);
  }

  // User info from .gitconfig if available
  this.gitInfo = {
    name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
    email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, ''),
    github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, ''),
  };

  // Default asset dirs to use for scaffolding
  this.defaultDirs = {
    css: 'css',
    js: 'js',
    img: 'image',
    cssPre: '_scss',
    jsPre: '_coffee',
    jekTmp: path.join(this.env.cwd, '.jekTmp')
  };

  // subgenerator
  // this.hookFor('jekyll:subGen', {
  //   args: args
  // });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.on('end', function () {

    // Clean up temp files
    spawn('rm', ['-r', this.defaultDirs.jekTmp], { stdio: 'inherit' });

    // Install Grunt and Bower dependencies
    // RWRW This should work now, as long as package and bower are there.
    //   console.log('\n\nI\'m all done. Running ' + 'npm install & bower install'.bold.yellow + ' to install the required dependencies. If this fails, try running the command yourself.\n\n');
    // RWRW OR easier, use underscore in bower.json with this.installDependencies in on end callback for depens.
    // this.installDependencies({ skipInstall: options['skip-install'] });

    // RWRW Remember to alert that the files in prep dir are just css, and need to
    // be preprocessed up
    // coffee can overwrite js

  });
};

util.inherits(Generator, yeoman.generators.NamedBase);

////////////////////////// User input ////////////////////////////

// TODO: When new prompt library lands:
//   Rewrite for conditional prompts
//   Auto populate with magicDefaults
//   Make some prompts required
//   Add custom validation
//   Make defaults editable with an equivalent of read module's edit: true

// Author information
Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(
    'This generator will scaffold and wire a Jekyll site. Yo, Jekyll!'.yellow.bold +
    '\n ' +
    '\nTell us a little about yourself.'.yellow + ' ☛'
  );
  var prompts = [{
    name: 'author',
    message: 'Your Name:',
    default: this.gitInfo.name
  },
  {
    name: 'email',
    message: 'Your Email:',
    default: this.gitInfo.email
  },
  {
    name: 'github',
    message: 'Your GitHub Username:',
    default: this.gitInfo.github
  },
  {
    name: 'twitter',
    message: 'Your Twitter Username:',
    default: '@' + this.gitInfo.github
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // String properties
    this.author  = props.author;
    this.email   = props.email;
    this.github  = props.github;
    this.twitter = props.twitter[0] === '@' ? props.twitter.substr(1) : props.twitter;

    cb();
  }.bind(this));
};

// Basic direcory structure
Generator.prototype.askForStructure = function askForStructure() {
  var cb = this.async();

  console.log('\nLet\'s set up some directories.'.yellow + ' ☛');

  var prompts = [{
    name: 'cssDir',
    message: 'Choose a css directory:',
    default: this.defaultDirs.css
    // Required, edit
  },
  {
    name: 'jsDir',
    message: 'Choose a javascript directory:',
    default: this.defaultDirs.js
    // Required, edit
  },
  {
    name: 'imgDir',
    message: 'Choose an image file directory:',
    default: this.defaultDirs.img
    // Required, edit
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // String properties
    // Trim leading and trailing /'s for use in underscore templates
    this.cssDir = props.cssDir.replace(/^\/*|\/*$/g, '');
    this.jsDir  = props.jsDir.replace(/^\/*|\/*$/g, '');
    this.imgDir = props.imgDir.replace(/^\/*|\/*$/g, '');

    cb();
  }.bind(this));
};

// Preprocessors and libraries
Generator.prototype.askForTools = function askFor() {
  var cb = this.async();

  // Multiple choice options
  // var cssPreOptions = ['s','c','n'];
  // var jsPreOptions  = ['c','n'];

  console.log('\nWire tools and preprocessors.'.yellow + ' ☛');

  var prompts = [{
    name: 'cssPre',
    message: 'Use a css preprocessor?\n s: Sass\n c: Sass & Compass\n n: none',
    default: 'n'
  },
  {
    name: 'cssPreDir',
    message: 'If so, choose a css preprocessor directory:',
    default: this.defaultDirs.cssPre
    // if above, Required, edit
  },
  {
    name: 'jsPre',
    message: 'Use a javascript preprocessor?\n c: Coffeescript\n n: none',
    default: 'n',
  },
  {
    name: 'jsPreDir',
    message: 'If so, choose a javascript preprocessor directory:',
    default: this.defaultDirs.jsPre
    // if above, Required, edit
  }
  // {
  //   name: 'requireJs',
  //   message: 'Use Require.js?',
  //   default: 'y/N'
  // }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // Default y/N answer to boolean
    // this.requireJs  = !(/n/i).test(props.requireJs);

    // Multiple choice 'none' to false
    this.cssPre    = (/n/i).test(props.cssPre) ? false : props.cssPre;
    this.jsPre     = (/n/i).test(props.jsPre)  ? false : props.jsPre;

    // String properties
    // Trim leading and trailing /'s for use in underscore templates
    this.cssPreDir = props.cssPreDir.replace(/^\/*|\/*$/g, '');
    this.jsPreDir  = props.jsPreDir.replace(/^\/*|\/*$/g, '');

    cb();
  }.bind(this));
};

// Jekyll boilerplate templates
// TODO: Make template choices extensible
Generator.prototype.askForTemplates = function askFor() {
  var cb = this.async();

  // Multiple choice options
  // var templateType = ['d','h5'];

  console.log('\nChoose a template.'.yellow + ' ☛');

  var prompts = [{
    name: 'templateType',
    message: 'Choose a Jekyll site template\n d:  Default\n h5: HTML5 ★ Boilerplate',
    default: 'd',
    warning: 'h5: Yo dog I heard you like boilerplates in your boilerplates...'
  },
  {
    name: 'h5bpCss',
    message: 'Add H5★BP css files?',
    default: 'Y/n'
  },
  {
    name: 'h5bpJs',
    message: 'Add H5★BP javascript files?',
    default: 'Y/n'
  },
  {
    name: 'h5bpIco',
    message: 'Add H5★BP favorite and touch icons?',
    default: 'y/N'
  },
  {
    name: 'h5bpDocs',
    message: 'Add H5★BP documentation?',
    default: 'y/N'
  },
  {
    name: 'h5bpAnalytics',
    message: 'Include Google Analytics?',
    default: 'y/N'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // Default Y/n answer to boolean
    this.h5bpCss       = (/y/i).test(props.h5bpCss);
    this.h5bpJs        = (/y/i).test(props.h5bpJs);

    // Default y/N answer to boolean
    this.h5bpIco       = !(/n/i).test(props.h5bpIco);
    this.h5bpDocs      = !(/n/i).test(props.h5bpDocs);
    this.h5bpAnalytics = !(/n/i).test(props.h5bpAnalytics);

    // String properties
    this.templateType = props.templateType;

    cb();
  }.bind(this));
};

// Jekyll configuration
Generator.prototype.askForJekyll = function askFor() {
  var cb = this.async();

  // Multiple choice options
  // var jekPage = ['[0-9]*','all'];
  var jekPostOptions = {
    d: 'date',
    p: 'pretty',
    n: 'none'
  };
  var jekMkdOptions = {
    m:  'maruku',
    rd: 'rdiscount',
    k:  'kramdown',
    rc: 'redcarpet'
  };

  console.log('\nAnd configure Jekyll.'.yellow + ' ☛' +
              '\nYou can change all of these options in Jekyll\'s config.yml.');

  var prompts = [{
    name: 'jekDescript',
    message: 'Site Description:'
  },
  {
    // TODO: Add handling for custom formats
    name: 'jekPost',
    message: 'Choose a post permalink style\n d: date\n p: pretty\n n: none\n',
    default: 'd'
  },
  {
    name: 'jekMkd',
    message: 'Markdown library \n m:  maruku\n rd: rdiscount\n k:  kramdown\n rc: redcarpet\n',
    default: 'm',
  },
  {
    name: 'jekPyg',
    message: 'Use the Pygments code highlighting library?',
    default: 'y/N'
  },
  {
    name: 'jekPage',
    message: 'How many posts should be shown on the home page?',
    default: '# of posts/All'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // Default y/N answer to boolean
    this.jekPyg      = !(/n/i).test(props.jekPyg);

    // String properties
    this.jekMkd      = jekMkdOptions[props.jekMkd];
    this.jekPost     = jekPostOptions[props.jekPost];

    // String properties without defaults to string or boolean
    this.jekDescript = props.jekDescript !== '' ? props.jekDescript : false;
    this.jekPage     = props.jekPage     !== '# of posts/All' ? 'all' : props.jekPage.toLowerCase;

    cb();
  }.bind(this));
};

////////////////////////// Generate App //////////////////////////
Generator.prototype.gemfile = function gemfile() {

  // This needs to complete entirely before bundle install runs
  // TODO: Make less fragile. Right now if these are in the same Generator
  // prototype method they'll fail due to race condition.
  this.template('Gemfile');
}

Generator.prototype.initJekyll = function initJekyll() {

  // Install dependencies
  shelljs.exec('bundle install');

  // Create a default Jekyll site in a temporary folder
  shelljs.exec('bundle exec jekyll new ' + this.defaultDirs.jekTmp);
};

Generator.prototype.directories = function directories() {

  // Scaffold Jekyll dirs
  this.mkdir(path.join('app', this.cssDir));
  this.mkdir(path.join('app', this.imgDir));
  this.mkdir(path.join('app', this.jsDir));
  this.mkdir('app/_layouts');
  this.mkdir('app/_posts');
  this.mkdir('app/_includes');
  this.mkdir('app/_plugins');
};

Generator.prototype.templates = function templates() {

  // Build formatted date for posts
  var date = new Date();
  var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  // Universal template files
  this.copy(path.join(this.defaultDirs.jekTmp, '_posts', formattedDate + '-welcome-to-jekyll.markdown'), path.join('app/_posts', formattedDate + '-welcome-to-jekyll.md'));
  // RWRW write template
  this.template('app/_posts/0000-00-00-yo-jekyll.md', 'app/_posts/' + formattedDate + '-yo-jekyll.md');

  // Default Jekyll templates
  if (this.templateType === 'd') {

    // From cli generated Jekyll site
    this.copy(path.join(this.defaultDirs.jekTmp, 'index.html'), 'app/index.html');
    this.copy(path.join(this.defaultDirs.jekTmp, '_layouts/post.html'), 'app/_layouts/post.html');
    this.copy(path.join(this.defaultDirs.jekTmp, 'css/main.css'), path.join('app', this.cssDir, 'main.css'));

    // From generator. Altered for Jekyll templating and Yeoman tasks.
    this.template('conditional/template-default/_layouts/default.html', 'app/_layouts/default.html');
  }

  // HTML5 Boilerplate templates
  else if (this.templateType === 'h5') {

    // Pull in the latest stable of H5BP
    var cb = this.async();

    this.remote('h5bp', 'html5-boilerplate', 'v4.2.0', function (err, remote) {
      if (err) {
        return cb(err);
      }

      // TODO: Get the remote cache location and use globbule to select and
      // copy files less fragily.

      // From H5BP git repo
      // Universal
      remote.copy('.htaccess', 'app/.htaccess');
      remote.copy('404.html', 'app/404.html');
      remote.copy('crossdomain.xml', 'app/crossdomain.xml');
      remote.copy('LICENSE.md', 'app/_H5BP-docs/LICENSE.md');
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
        remote.directory('doc', 'app/_H5BP-docs/code-docs');
        remote.copy('CHANGELOG.md', 'app/_H5BP-docs/CHANGELOG.md');
        remote.copy('CONTRIBUTING.md', 'app/_H5BP-docs/CONTRIBUTING.md');
        remote.copy('README.md', 'app/_H5BP-docs/README.md');
      }

      cb();
    }.bind(this));

    // From generator. Files altered for Jekyll templating and Yeoman tasks.
    // Universal
    this.copy('conditional/template-H5BP/index.html', 'app/index.html');
    this.copy('conditional/template-H5BP/_layouts/post.html', 'app/_layouts/post.html');
    this.template('conditional/template-H5BP/humans.txt', 'app/humans.txt');
    this.template('conditional/template-H5BP/_includes/scripts.html', 'app/_includes/scripts.html');
    this.template('conditional/template-H5BP/_layouts/default.html', 'app/_layouts/default.html');

    // Google analytincs include
    if (this.h5bpAnalytics) {
      this.copy('conditional/template-H5BP/_includes/googleanalytics.html', 'app/_includes/googleanalytics.html');
    }
  }
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

Generator.prototype.gruntfile = function gruntfile() {
  // RWRW write template
  // this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  // RWRW write template
  // this.template('_package.json', 'package.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editor = function editor() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.jekFiles = function jekFiles() {

  // Jekyll config files
  this.copy('app/_config.build.yml', 'app/_config.build.yml');
  this.template('app/_config.yml');

  // Pygments styles
  if (this.jekPyg) {
    this.copy(path.join(this.defaultDirs.jekTmp, 'css/syntax.css'), path.join('app', this.cssDir, 'syntax.css'));
  }
};

Generator.prototype.cssPreSass = function cssPreSass() {
  if (this.cssPre) {
    this.mkdir(path.join('app', this.cssPreDir));
  }

  // Sass and Compass
  if (['s', 'c'].indexOf(this.cssPre)) {

    this.template('conditional/sass/readme.md', path.join('app', this.cssPreDir, 'readme.md'));
    // RWRW edit template for being in the proj root dir.
    this.template('conditional/sass/config.rb', 'config.rb');

    // Move css files to scss files
    var files = globule.find('**/*.css', {srcBase: path.join('app', this.cssDir)});

    files.forEach(function (file) {
      this.copy(path.join('../../../../app', this.cssDir, file),
                path.join('app', this.cssPreDir, file.replace(/\.css$/, '.scss')));

      // Cleanup css files to prevent confusion
      spawn('rm', ['-f', path.join('app', this.cssDir, file)], { stdio: 'inherit' });
    }, this);
  }
};

Generator.prototype.jsPreCoffee = function jsPreCoffee() {
  if (this.jsPre) {
    this.mkdir(path.join('app', this.jsPreDir));
  }

  // Coffeescript
  if (this.jsPre === 'c') {
    this.template('conditional/coffee/readme.md', path.join('app', this.jsPreDir, 'readme.md'));
  }
};


//////////////////////////////////////////////////////////
// TODO: These ↓

// Generator.prototype.requireJs = function requireJs() {
// };

// Generator.prototype.testing = function testing() {
// };

// TODO: Categories subgenerator (?)
// TODO: yo arg for json file with all config in it.
// TODO: Configural downloads to the _plugins dir.

// TODO: Do references to the 'app' directory need to be made configurable?
// See generator-angular.

/////////////////
// RWRW NOTES

// End with a list of commands and description
// all components managed with Bower

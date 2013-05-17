'use strict';
var util = require('util');
var path = require('path');
var globule = require('globule');
var shelljs = require('shelljs');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

// TODO:
// Categories subgenerator
// Better propmts when new prompt library lands
// Pass object to the command line to auto populate prompts
// Add Require.js, Stylus
// Glob remote files
// Rewrite prompts to take advantage of multiple choice objects
// Make template choices extensible?

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  // Make sure Ruby dependencies are installed, or exit
  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  if (!dependenciesInstalled) {
    console.log('Looks like you\'re missing some dependencies.' +
      '\nMake sure ' + 'Ruby'.white + ' and the ' + 'Bundler gem'.white +
      ' are installed, then run again.');
    shelljs.exit(1);
  }

  // Specify an appname from the command line, or use the parent directory name
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  // Default asset dirs to use for scaffolding
  this.defaultDirs = {
    css: 'css',
    js: 'js',
    img: 'image',
    fonts: 'fonts',
    cssPre: '_scss',
    jsPre: '_coffee',
    jekTmp: path.join(this.env.cwd, '.tmp/jekyll')
  };
  this.jekTmpDir = this.defaultDirs.jekTmp;

  // Get user info from .gitconfig if available
  this.gitInfo = {
    name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
    email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, ''),
    github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, ''),
  };

  // Get package.json for templating
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {

    // Clean up temp files
    spawn('rm', ['-r', '.tmp'], { stdio: 'inherit' });
    // Install Grunt and Bower dependencies
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(Generator, yeoman.generators.Base);

// User input
Generator.prototype.askForAuthor = function askForAuthor() {
  var cb = this.async();

  console.log('This generator will scaffold and wire a Jekyll site. Yo, Jekyll!'.yellow.bold +
    '\n\nTell us a little about yourself.'.yellow + ' ☛');

  var prompts = [{
    name: 'author',
    description: 'Name:',
    default: this.gitInfo.name
  },
  {
    name: 'email',
    description: 'Email:',
    default: this.gitInfo.email,
    format: 'email',
    message: 'Must be a valid email address'
  },
  {
    name: 'github',
    description: 'GitHub Username:',
    default: this.gitInfo.github
  },
  {
    name: 'twitter',
    description: 'Twitter Username:',
    default: '@' + this.gitInfo.github
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    this.author  = props.author;
    this.email   = props.email;
    this.github  = props.github;
    this.twitter = props.twitter[0] === '@' ? props.twitter.substr(1) : props.twitter;

    cb();
  }.bind(this));
};

Generator.prototype.askForTools = function askForTools() {
  var cb = this.async();

  // Multiple select options
  var cssPreOptions = {
    s: 'sass',
    c: 'compass',
    n: 'none'
  };
  var jsPreOptions  = {
    c: 'coffeescript',
    n: 'none'
  };

  console.log('\nWire tools and preprocessors.'.yellow + ' ☛');

  var prompts = [{
    name: 'cssPre',
    description: 'Use a css preprocessor?\n s: Sass\n c: Sass & Compass\n n: none',
    default: 'n',
    pattern: new RegExp('^[scn]$', 'i'),
    message: 'Enter ' + 's'.white + ', ' + 'c'.white + ', or ' + 'n'.white
  },
  {
    name: 'jsPre',
    description: 'Use a javascript preprocessor?\n c: Coffeescript\n n: none',
    default: 'n',
    pattern: new RegExp('^[cn]$', 'i'),
    message: 'Enter ' + 'c'.white + ' or ' + 'n'.white
  }
  // {
  //   name: 'requireJs',
  //   description: 'Use Require.js?',
  //   default: false
  // }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // this.requireJs  = !(/n/i).test(props.requireJs);

    // Multiple choice 'none' to false
    this.cssPre = (/n/i).test(props.cssPre) ? false : cssPreOptions[props.cssPre];
    this.jsPre  = (/n/i).test(props.jsPre)  ? false : jsPreOptions[props.jsPre];

    cb();
  }.bind(this));
};

Generator.prototype.askForStructure = function askForStructure() {
  var cb = this.async();

  console.log('\nSet up some directories.'.yellow + ' ☛' +
    '\nNested directories are fine.');

  var prompts = [{
    name: 'cssDir',
    description: 'Choose a css directory:',
    default: this.defaultDirs.css
  },
  {
    name: 'jsDir',
    description: 'Choose a javascript directory:',
    default: this.defaultDirs.js
  },
  {
    name: 'imgDir',
    description: 'Choose an image file directory:',
    default: this.defaultDirs.img
  },
  {
    name: 'fontsDir',
    description: 'Choose a webfonts directory:',
    default: this.defaultDirs.fonts
  }];
  var cssPreDirPrompt = {
    name: 'cssPreDir',
    description: 'Choose a css preprocessor directory:',
    default: this.defaultDirs.cssPre
  };
  var jsPreDirPrompt = {
    name: 'jsPreDir',
    description: 'Choose a javascript preprocessor directory:',
    default: this.defaultDirs.jsPre
  };

  if (this.cssPre) {
    prompts.push(cssPreDirPrompt);
  }
  if (this.jsPre) {
    prompts.push(jsPreDirPrompt);
  }

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // Trim leading and trailing /'s for use in underscore templates
    this.cssDir   = props.cssDir.replace(/^\/*|\/*$/g, '');
    this.jsDir    = props.jsDir.replace(/^\/*|\/*$/g, '');
    this.imgDir   = props.imgDir.replace(/^\/*|\/*$/g, '');
    this.fontsDir = props.fontsDir.replace(/^\/*|\/*$/g, '');
    this.cssPreDir = typeof props.cssPreDir !== 'undefined' ? props.cssPreDir.replace(/^\/*|\/*$/g, '') : false;
    this.jsPreDir  = typeof props.jsPreDir !== 'undefined' ? props.jsPreDir.replace(/^\/*|\/*$/g, '') : false;

    cb();
  }.bind(this));
};

Generator.prototype.askForTemplates = function askForTemplates() {
  var cb = this.async();

  // Multiple select options
  var templateTypeOptions = {
    d: 'default',
    h5: 'h5bp'
  };

  console.log('\nChoose a template.'.yellow + ' ☛');

  var prompts = [{
    name: 'templateType',
    description: 'Choose a Jekyll site template\n d:  Default\n h5: HTML5 ★ Boilerplate',
    default: 'd',
    pattern: new RegExp('^d|h5$', 'i'),
    message: 'Enter ' + 'd'.white + ' or ' + 'h5'.white
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    this.templateType = templateTypeOptions[props.templateType];

    cb();
  }.bind(this));
};

Generator.prototype.askForh5bp = function askForh5bp() {
  if (this.templateType === 'h5bp') {
    var cb = this.async();

    var prompts = [{
      name: 'h5bpCss',
      description: 'Add H5★BP css files',
      default: 'Y/n',
      pattern: new RegExp('^([yn]|(y\/n)|(n\/y))$', 'i'),
      message: 'Enter ' + 'y'.white + ' or ' + 'n'.white
    },
    {
      name: 'h5bpJs',
      description: 'Add H5★BP javascript files?',
      default: 'Y/n',
      pattern: new RegExp('^([yn]|(y\/n)|(n\/y))$', 'i'),
      message: 'Enter ' + 'y'.white + ' or ' + 'n'.white
    },
    {
      name: 'h5bpIco',
      description: 'Add H5★BP favorite and touch icons?',
      default: 'Y/n',
      pattern: new RegExp('^([yn]|(y\/n)|(n\/y))$', 'i'),
      message: 'Enter ' + 'y'.white + ' or ' + 'n'.white
    },
    {
      name: 'h5bpDocs',
      description: 'Add H5★BP documentation?',
      default: 'n/Y',
      pattern: new RegExp ('^([yn]|(y\/n)|(n\/y))$', 'i'),
      message: 'Enter ' + 'y'.white + ' or ' + 'n'.white
    },
    {
      name: 'h5bpAnalytics',
      description: 'Include Google Analytics?',
      default: 'Y/n',
      pattern: new RegExp('^([yn]|(y\/n)|(n\/y))$', 'i'),
      message: 'Enter ' + 'y'.white + ' or ' + 'n'.white
    }];

    this.prompt(prompts, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      // Assign prompt results to Generator object
      this.h5bpCss       = (/y/i).test(props.h5bpCss);
      this.h5bpJs        = (/y/i).test(props.h5bpJs);
      this.h5bpIco       = !(/n/i).test(props.h5bpIco);
      this.h5bpDocs      = !(/n/i).test(props.h5bpDocs);
      this.h5bpAnalytics = !(/n/i).test(props.h5bpAnalytics);

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

  // Multiple select options
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
    description: 'Site Description:'
  },
  {
    name: 'jekPost',
    description: 'Choose a post permalink style\n d: date\n p: pretty\n n: none\n',
    default: 'd',
    pattern: new RegExp('^[dpn]$', 'i'),
      message: 'Enter ' + 'd'.white + ', ' + 'p'.white + ' or ' + 'n'.white
  },
  {
    name: 'jekMkd',
    description: 'Markdown library \n m:  maruku\n rd: rdiscount\n k:  kramdown\n rc: redcarpet\n',
    default: 'm',
    pattern: new RegExp('^m|(rd)|k|(rc)$', 'i'),
      message: 'Enter ' + 'm'.white + ', ' + 'rd'.white + ', ' + 'k'.white + ' or ' + 'rc'.white
  },
  {
    name: 'jekPyg',
    description: 'Use the Pygments code highlighting library?',
    default: 'Y/n',
    pattern: new RegExp('^([yn]|(y\/n)|(n\/y))$', 'i'),
    message: 'Enter ' + 'y'.white + ' or ' + 'n'.white
  },
  {
    name: 'jekPage',
    description: 'How many posts should be shown on the home page?',
    default: '# of posts/All',
    pattern: new RegExp('^[0-9]?|[aA]ll', 'i'),
    message: 'Enter ' + 'a number'.white + ' or ' + 'all'.white
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    this.jekPyg  = !(/n/i).test(props.jekPyg);
    this.jekMkd  = jekMkdOptions[props.jekMkd];
    this.jekPost = jekPostOptions[props.jekPost];

    // String properties without defaults to string or boolean
    this.jekDescript = props.jekDescript !== '' ? props.jekDescript : false;
    this.jekPage     = props.jekPage     !== '# of posts/All' ? 'all' : props.jekPage.toLowerCase;

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

Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
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
  this.template('app/_posts/yo-jekyll.md', 'app/_posts/' + formattedDate + '-yo-jekyll.md');

  // Jekyll cli template
  if (this.templateType === 'default') {

    // From cli generated template
    this.copy(path.join(this.jekTmpDir, 'index.html'), 'app/index.html');
    this.copy(path.join(this.jekTmpDir, '_layouts/post.html'), 'app/_layouts/post.html');
    this.copy(path.join(this.jekTmpDir, 'css/main.css'), path.join('app', this.cssDir, 'main.css'));

    // Yeoman tailored files from generator
    this.template('conditional/template-default/_layouts/default.html', 'app/_layouts/default.html');
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

    files.forEach(function (file) {
      this.copy(path.join('../../../../app', this.cssDir, file),
                path.join('app', this.cssPreDir, file.replace(/\.css$/, '.scss')));

      // Cleanup old css files
      spawn('rm', ['-f', path.join('app', this.cssDir, file)], { stdio: 'inherit' });
    }, this);

    // Compass only files
    if (this.cssPre === 'compass') {
      this.template('conditional/sass-compass/config.rb', 'config.rb');
    }
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

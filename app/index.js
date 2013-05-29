'use strict';
var util = require('util');
var path = require('path');
var globule = require('globule');
var shelljs = require('shelljs');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

// Prompt helpers
var promptHelp = {
  // Return a formatted string of an object's key/value pairs
  multi: function (obj) {
    var string = '';
    Object.keys(obj).forEach(function (value) {
      string += '\n ' + value + ': ' + obj[value];
    });
    return string;
  },
  // Return a simple regex to match an object's keys
  multiValid: function (obj) {
    var pattern = '^' + Object.keys(obj).join('|') + '$';
    return new RegExp(pattern, 'i');
  },
  boolValid: /^([yn]|(y\/n)|(n\/y))$/i,
  message: {
    multi: 'Enter one of the options above',
    bool: 'Enter y or n'
  }
};

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

    this.author  = props.author;
    this.email   = props.email;
    this.github  = props.github;
    this.twitter = props.twitter[0] === '@' ? props.twitter.substr(1) : props.twitter;

    cb();
  }.bind(this));
};

Generator.prototype.askForTools = function askForTools() {
  var cb = this.async();

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
    description: 'Use a css preprocessor?' + promptHelp.multi(cssPreOptions),
    default: 'n',
    pattern: promptHelp.multiValid(cssPreOptions),
    message: promptHelp.message.multi
  },
  {
    name: 'autoPre',
    description: 'Use Autoprefixer?',
    default: 'Y/n',
    pattern: promptHelp.boolValid,
    message: promptHelp.message.bool
  },
  {
    name: 'jsPre',
    description: 'Use a javascript preprocessor?' + promptHelp.multi(jsPreOptions),
    default: 'n',
    pattern: promptHelp.multiValid(jsPreOptions),
    message: promptHelp.message.multi
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Multiple choice 'none' to false
    this.cssPre  = (/n/i).test(props.cssPre) ? false : cssPreOptions[props.cssPre];
    this.jsPre   = (/n/i).test(props.jsPre)  ? false : jsPreOptions[props.jsPre];
    this.autoPre = (/y/i).test(props.autoPre);

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
    default: 'css'
  },
  {
    name: 'jsDir',
    description: 'Choose a javascript directory:',
    default: 'js'
  },
  {
    name: 'imgDir',
    description: 'Choose an image file directory:',
    default: 'image'
  },
  {
    name: 'fontsDir',
    description: 'Choose a webfonts directory:',
    default: 'fonts'
  }];
  var cssPreDirPrompt = {
    name: 'cssPreDir',
    description: 'Choose a css preprocessor directory:',
    default: '_scss'
  };
  var jsPreDirPrompt = {
    name: 'jsPreDir',
    description: 'Choose a javascript preprocessor directory:',
    default: '_src'
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

    // Trim leading and trailing /'s for use in underscore templates
    this.cssDir    = props.cssDir.replace(/^\/*|\/*$/g, '');
    this.jsDir     = props.jsDir.replace(/^\/*|\/*$/g, '');
    this.imgDir    = props.imgDir.replace(/^\/*|\/*$/g, '');
    this.fontsDir  = props.fontsDir.replace(/^\/*|\/*$/g, '');
    this.cssPreDir = this.cssPre ? props.cssPreDir.replace(/^\/*|\/*$/g, '') : false;
    this.jsPreDir  = this.jsPre ? props.jsPreDir.replace(/^\/*|\/*$/g, '') : false;

    cb();
  }.bind(this));
};

Generator.prototype.askForTemplates = function askForTemplates() {
  var cb = this.async();

  var templateTypeOptions = {
    d: 'default',
    h5: 'HTML5 ★ Boilerplate'
  };

  console.log('\nChoose a template.'.yellow + ' ☛');

  var prompts = [{
    name: 'templateType',
    description: 'Choose a Jekyll site template' + promptHelp.multi(templateTypeOptions),
    default: 'd',
    pattern: promptHelp.multiValid(templateTypeOptions),
    message: promptHelp.message.multi
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.templateType = props.templateType === 'h5' ? 'h5bp' : templateTypeOptions[props.templateType];

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
      pattern: promptHelp.boolValid,
      message: promptHelp.message.bool
    },
    {
      name: 'h5bpJs',
      description: 'Add H5★BP javascript files?',
      default: 'Y/n',
      pattern: promptHelp.boolValid,
      message: promptHelp.message.bool
    },
    {
      name: 'h5bpIco',
      description: 'Add H5★BP favorite and touch icons?',
      default: 'Y/n',
      pattern: promptHelp.boolValid,
      message: promptHelp.message.bool
    },
    {
      name: 'h5bpDocs',
      description: 'Add H5★BP documentation?',
      default: 'y/N',
      pattern: promptHelp.boolValid,
      message: promptHelp.message.bool
    },
    {
      name: 'h5bpAnalytics',
      description: 'Include Google Analytics?',
      default: 'Y/n',
      pattern: promptHelp.boolValid,
      message: promptHelp.message.bool
    }];

    this.prompt(prompts, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.h5bpCss       = (/y/i).test(props.h5bpCss);
      this.h5bpJs        = (/y/i).test(props.h5bpJs);
      this.h5bpIco       = (/y/i).test(props.h5bpIco);
      this.h5bpDocs      = !(/n/i).test(props.h5bpDocs);
      this.h5bpAnalytics = (/y/i).test(props.h5bpAnalytics);

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
              '\nYou can change all of these options in Jekyll\'s _config.yml.');

  var prompts = [{
    name: 'jekDescript',
    description: 'Site Description:'
  },
  {
    name: 'jekPost',
    description: 'Choose a post permalink style' + promptHelp.multi(jekPostOptions),
    default: 'd',
    pattern: promptHelp.multiValid(jekPostOptions),
    message: promptHelp.message.multi
  },
  {
    name: 'jekMkd',
    description: 'Markdown library' + promptHelp.multi(jekMkdOptions),
    default: 'm',
    pattern: promptHelp.multiValid(jekMkdOptions),
    message: promptHelp.message.multi
  },
  {
    name: 'jekPyg',
    description: 'Use the Pygments code highlighting library?',
    default: 'Y/n',
    pattern: promptHelp.boolValid,
    message: promptHelp.message.bool
  },
  {
    name: 'jekPage',
    description: 'Enable pagination?',
    default: 'Number of posts, or \'all\'',
    message: 'Enter a number'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.jekPyg      = (/y/i).test(props.jekPyg);
    this.jekMkd      = jekMkdOptions[props.jekMkd];
    this.jekPost     = jekPostOptions[props.jekPost];
    this.jekDescript = props.jekDescript;
    this.jekPage     = typeof props.jekPage === 'number' ? props.jekPage : false;

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
  this.jekTmpDir = path.join(this.env.cwd, '.jekyll');
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

    files.forEach(function (file) {

      this.copy(path.join(process.cwd(), 'app', this.cssDir, file),
                path.join('app', this.cssPreDir, file.replace(/\.css$/, '.scss')));

      // Cleanup old css files
      spawn('rm', ['-f', path.join('app', this.cssDir, file)], { stdio: 'inherit' });
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

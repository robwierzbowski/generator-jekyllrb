'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  // Specify an appname from the command line, or use dir name
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  // RWRW Attempt to get user's gitconfig name. Doesn't work.
  // var nameDefault = exec('git config user.name', function (err, stdout) {
  //   if (err) {
  //     return 'breb smath';
  //   }
  //   return stdout;
  // });


  // var args = ['main'];

  // subgenerator
  // this.hookFor('jekyll:subGen', {
  //   args: args
  // });

  // Set permanant opts here
  // var someVar = 'gar';

  // RWRW This should work now, as long as package and bower are there.
  // this.on('end', function () {
  //   console.log('\n\nI\'m all done. Running ' + 'npm install & bower install'.bold.yellow + ' to install the required dependencies. If this fails, try running the command yourself.\n\n');
  //   spawn('npm', ['install'], { stdio: 'inherit' });
  //   spawn('bower', ['install'], { stdio: 'inherit' });
  // });

  // Bower install from new yo docs

  // "Alternatively they can install with" this.bowerInstall(['jquery', 'underscore'], { save: true });

  // Or...
  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  // RWRW
  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));


  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.NamedBase);

////////////////////////// User input ////////////////////////////

// TODO: When new prompt library lands in Yeoman 1.0:
//   Rewrite for conditional prompts
//   Auto populate with magicDefaults
//   Make some prompts required
//   Add custom validation
//   Make defaults editable with an equivalent of read module's edit: true

// Basic direcory structure
Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(
    'This generator will scaffold and wire a Jekyll site. Yo, Jekyll!'.yellow.bold +
    '\n ' +
    '\nLet\'s set up some directories.'.yellow + ' ☛'
  );

  var prompts = [{
    name: 'cssDir',
    message: 'Choose a css directory:',
    default: 'css/'
    // Required, edit
  },
  {
    name: 'jsDir',
    message: 'Choose a javascript directory:',
    default: 'js/'
    // Required, edit
  },
  {
    name: 'imgDir',
    message: 'Choose an image file directory:',
    default: 'images/'
    // Required, edit
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // String properties
    this.cssDir       = props.cssDir;
    this.jsDir        = props.jsDir;
    this.imgDir       = props.imgDir;

    cb();
  }.bind(this));
};

// Preprocessors and libraries
Generator.prototype.askForTools = function askFor() {
  var cb = this.async();

  // Multiple choice options
  // var cssPrep = ['s','c','n'];
  // var jsPrep  = ['c','n'];

  console.log('\nWire tools and preprocessors.'.yellow + ' ☛');

  var prompts = [{
    name: 'cssPrep',
    message: 'Use a css preprocessor?\n s: Sass\n c: Sass & Compass\n n: none',
    default: 'n'
  },
  {
    name: 'cssPrepDir',
    message: 'If so, choose a css preprocessor directory:',
    default: '_scss/'
    // if above, Required, edit
  },
  {
    name: 'jsPrep',
    message: 'Use a javascript preprocessor?\n c: Coffeescript\n n: none',
    default: 'n',
  },
  {
    name: 'jsPrepDir',
    message: 'If so, choose a javascript preprocessor directory:',
    default: '_coffee/'
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
    this.requireJs     = !(/n/i).test(props.requireJs);

    // Multiple choice 'none' to false
    this.cssPrep       = (/n/i).test(props.cssPrep) ? false : props.cssPrep;
    this.jsPrep        = (/n/i).test(props.jsPrep)  ? false : props.jsPrep;

    // String properties
    this.cssPrepDir   = props.cssPrepDir;
    this.jsPrepDir    = props.jsPrepDir;

    cb();
  }.bind(this));
};

// Jekyll boilerplate templates
Generator.prototype.askForTemplates = function askFor() {
  var cb = this.async();

  // Multiple choice options
  // var templateType = ['d','h'];

  console.log('\nChoose a template.'.yellow + ' ☛');

  var prompts = [{
    name: 'templateType',
    message: 'Choose a Jekyll site template\n d:  Default\n h: HTML5 ★ Boilerplate',
    default: 'd',
    warning: 'h: Yo dog I heard you like boilerplates in your boilerplates...'
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
  // var jekPost = ['d','p','n'];
  // var jekMkd  = ['m','rd','k','rc'];

  console.log('\nAnd configure Jekyll.'.yellow + ' ☛');

  var prompts = [{
    name: 'jekAuthor',
    message: 'Your Name:'
   // RWRW default: nameDefault;
  },
  {
    name: 'jekEmail',
    message: 'Your Email:'
  },
  {
    name: 'jekTwit',
    message: 'Your @Twitter Username:'
  },
  {
    name: 'jekGHub',
    message: 'Your GitHub Username:'
  },
  {
    name: 'jekDescript',
    message: 'Site Description:'
  },
  {
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
    warning: 'You can change all of these options in Jekyll\'s config.yml.'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Assign prompt results to Generator object
    // Default y/N answer to boolean
    this.jekPyg      = !(/n/i).test(props.jekPyg);

    // String properties
    this.jekMkd      = props.jekMkd;
    this.jekPost     = props.jekPost;

    // String properties without defaults to string or boolean
    this.jekAuthor   = props.jekAuthor   !== '' ? props.jekAuthor   : false;
    this.jekEmail    = props.jekEmail    !== '' ? props.jekEmail    : false;
    this.jekTwit     = props.jekTwit     !== '' ? props.jekTwit     : false;
    this.jekGHub     = props.jekGHub     !== '' ? props.jekGHub     : false;
    this.jekDescript = props.jekDescript !== '' ? props.jekDescript : false;
    this.jekPage     = props.jekPage     !== '' ? props.jekPage     : false;

    cb();
  }.bind(this));
};

////////////////////////// Generate App //////////////////////////

Generator.prototype.app = function app() {


  // Create blank Jekyll site in app  // RWRW .tmp and then copy in?
  exec('jekyll new app', function (err, stdout) {
    if (err) {
      return this.emit('error', err);
    }
    if (stdout) {

      // fs.renameSync('app/css', 'app/bladf');

//   // Scaffold user specified Jekyll directories
//   if (!(/^css\/?$/).test(this.cssDir)) {
//     fs.renameSync('app/css', 'app/' + this.cssDir);
//   }
//   if (!(/^images\/?$/).test(this.imgDir)) {
//     fs.renameSync('app/images', 'app/' + this.cssDir);
//   }
      console.log('Default Jekyll scaffold created');
    }
  });



  // remove confg and default?

  // Scaffold non-essential but useful Jekyll dirs
  this.mkdir('app/_includes');
  this.mkdir('app/_plugins');


  this.mkdir('app/' + this.jsDir);
};

Generator.prototype.gruntfile = function gruntfile() {
  // RWRW Gruntfile needs to have correct object.props
  // this.template('Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
//   this.template('_package.json', 'package.json');
};

Generator.prototype.git = function git() {
//   this.copy('gitignore', '.gitignore');
//   this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
//   this.copy('bowerrc', '.bowerrc');
//   this.copy('bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
// //  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editor = function editor() {
//  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.templates = function templates() {

  // needs css from exec to be in place?

  // css if preproc is false

  // humans

  // remove/ clean up image dir
  // grunt.file.delete(filepath [, force: true])

  // h5 info/docs

  //this.bowerInstall
  // if h5 add and save vendor to bower? yes.

};

Generator.prototype.jekFiles = function jekFiles() {
  // 2nd post

  // config.yml

  // readme
};

Generator.prototype.cssPrep = function cssPrep() {
//   if (this.cssPrep) {

//     this.mkdir('app/' + this.cssPrepDir);

      // needs css from exec to be in place?
      // RWRW Needs copy css to scss if preproc on.
//   }
};

Generator.prototype.jsPreproc = function jsPreproc() {
  if (this.jsPrep) {
    this.mkdir('app/' + this.jsPrepDir);
  }
};



// TODO: These ↓

// Generator.prototype.requireJs = function testing() {
// };

// Generator.prototype.testing = function testing() {
//   this.copy('editorconfig', '.editorconfig');
// };

// TODO: Categories subgenerator



/////////////////
// RWRW NOTES

// End with a list of commands and description
// all components managed with Bower

// SUBGENERATOR FOR CATEGORIES!!!!
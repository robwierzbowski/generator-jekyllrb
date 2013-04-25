'use strict';
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

  // Set permanant opts here
  // var someVar = 'gar';


  // RWRW This should work now, as long as package and bower are there.
  // this.on('end', function () {
  //   console.log('\n\nI\'m all done. Running ' + 'npm install & bower install'.bold.yellow + ' to install the required dependencies. If this fails, try running the command yourself.\n\n');
  //   spawn('npm', ['install'], { stdio: 'inherit' });
  //   spawn('bower', ['install'], { stdio: 'inherit' });
  // });

  // Bower install from new yo docs
  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  // RWRW
  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

///////////////////////////////////////////////
// Gather user input

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
    '\nFirst let\'s set up some directories.'.yellow + ' ☛'
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

  console.log('\nNext let\'s wire up tools and preprocessors.'.yellow + ' ☛');

  var prompts = [{
    name: 'cssPrep',
    message: 'Use a css preprocessor?\n s: Sass\n c: Sass & Compass\n n: none',
    default: 'n'
  },
  {
    name: 'cssPrepDir',
    message: 'If so, choose a css preprocessor file directory:',
    default: 'scss/'
    // if above, Required, edit
  },
  {
    name: 'jsPrep',
    message: 'Use a javascript preprocessor?\n c: Coffeescript\n n: none',
    default: 'n',
  },
  {
    name: 'jsPrepDir',
    message: 'If so, choose a javascript preprocessor file directory:',
    default: 'coffee/'
    // if above, Required, edit
  },
  {
    name: 'requireJs',
    message: 'Use Require.js?',
    default: 'y/N'
  }];

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

  console.log('\nChoose template components.'.yellow + ' ☛');

  var prompts = [{
    name: 'templateType',
    message: 'Choose a Jekyll site template\n d:  Default\n h: HTML5 ★ Boilerplate',
    default: 'd',
    warning: 'h: Yo dog I heard you like boilerplates in your boilerplates...'
  },
  {
    name: 'h5bpCss',
    message: 'Add H5BP css files?',
    default: 'Y/n'
  },
  {
    name: 'h5bpJs',
    message: 'Add H5BP javascript files?',
    default: 'Y/n'
  },
  {
    name: 'h5bpIco',
    message: 'Add H5BP favorite and touch icons?',
    default: 'y/N'
  },
  {
    name: 'h5bpDocs',
    message: 'Add H5BP documentation?',
    default: 'y/N'
  },
  {
    name: 'h5bpAnalytics',
    message: 'Add Google Analytics in an include?',
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

  console.log('\nAnd last, let\'s configure Jekyll.'.yellow + ' ☛');

  var prompts = [{
    name: 'jekAuthor',
    message: 'Your Name:'
  },
  // If H5BP
  {
    name: 'humansEmail',
    message: 'Your Email:'
  },
  // If H5BP
  {
    name: 'humansTwit',
    message: 'Your Twitter Username:'
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
    this.humansEmail = props.humansEmail !== '' ? props.humansEmail : false;
    this.humansTwit  = props.humansTwit  !== '' ? props.humansTwit  : false;
    this.jekDescript = props.jekDescript !== '' ? props.jekDescript : false;
    this.jekPage     = props.jekPage     !== '' ? props.jekPage     : false;

    cb();
  }.bind(this));
};

///////////////////////////////////////////////
// Scaffolding

Generator.prototype.app = function app() {

  console.log(this);

  // create app folder for jek
  this.mkdir('app');

  // Scaffold non-essential but nice jekyll dirs
  this.mkdir('app/_includes');
  this.mkdir('app/_plugins');

  // Creates blank Jekyll site
  exec('jekyll new app', function (error, stdout) {
    console.log(stdout);
  });

  //?? Add responses? consol.log('sass in dirx will be compiled to dir y')?

  // move css dir
  // create js dir
  // move image dir
      // gruntfile. but maybe needed at end.

  // rename init dirs to something chosen dirs won't use?
  // OR init jek in template dir, copy out if needed, and delete at end?
      // consideration == what if jek new changes, includes more files?

  // delete config yaml
  // delete git keeps (?)
  // delete syntax css


  // Just copy
  // add yo-jek post
  // bowerrc
  // editorconfig
  // gitattr gitignore
  // travis (needed?)

  // Process and import:
  // new yml
  // readme.md
  // bower.json       --These two are for dependecy man, one for bower
  // package.json     --| and one for npm/ yeoman itself
  // !!GRUNTFILE!!


  // if h5BP
  // delete rss img
  // delete default screen.css

  // Just copy
  // 404
  // crossdomain
  // license
  // htaccess
  // robots
  // includes
  // if analytics? includes/ga
  // if docs, docs folder
      // docs are md, exclude from compile? config.yml setting.
  // if favicons, favicons

  // if CSS, delete css files (style), add h5 css (main).

  // if js, copy js (main, plugin),
      // add jq to bower.json
      // add mdrnizr to bower.json? Or by hand, custom build. Should it stay in components? maybe components/vendor

  // Process and import:
  // h5 layout dflt index
  // humans.txt
  // app/index.html
  // delete layouts, add h5 layouts (default, post)
    // default.html style-> main change
    // default.html script-> main change

  // if sass or if compass
      // make folder, add style.scss? it will overwrite style.css
      // add and process config.rb
        // main if h5bp?
      // ?? All css stays css, not sass.
      // GRUNTFILE
      // package.json grunt-contrib-
      // default.html
  // if cofeescript
      // make folder, add scripts.coffee? it will overwrite scripts.js
      // GRUNTFILE
      // package.json grunt-contrib-
      // default.html
  // if require
      // GRUNTFILE
      // package.json grunt-contrib-
      // default.html

  // if !pygments, delete syntax.css

  // Create Jekyll directories
  this.mkdir('app/' + this.cssDir);
  this.mkdir('app/' + this.jsDir);
  this.mkdir('app/' + this.imgDir);

  if (this.cssPrep !== false) {
    this.mkdir('app/' + this.cssPrepDir);
  }
  if (this.jsPrep !== false) {
    this.mkdir('app/' + this.jsPrepDir);
  }

  // Default



// copy over standard items
  // add underscore template processing to all files

};



//?? What do the different methods of Generator.prototype mean? run by grunt?

// Generator.prototype.projectfiles = function projectfiles() {
//   // this.copy('editorconfig', '.editorconfig');
//   // this.copy('jshintrc', '.jshintrc');
// };



// RWRW install packages with bower
// Generator.prototype.bootstrapFiles = function bootstrapFiles() {

//    // map format -> package name
//    var packages = {
//        css: 'bootstrap.css',
//        sass: 'sass-bootstrap',
//        less: 'bootstrap'
//    };

//    this.install(packages[this.format]);
// };


/////////////////
// RWRW NOTES

// Alternatively they can install with this.bowerInstall(['jquery', 'underscore'], { save: true });
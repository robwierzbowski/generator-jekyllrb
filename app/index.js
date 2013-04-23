'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  // RWRW Add cl --arguments here
  // this.argument('appname', { type: String, required: false });
  // this.appname = this.appname || path.basename(process.cwd());

  // Set permanant opts here
  // var someVar = 'gar';


  this.on('end', function () {
    console.log('\n\nI\'m all done. Running ' + 'npm install & bower install'.bold.yellow + ' to install the required dependencies. If this fails, try running the command yourself.\n\n');
    spawn('npm', ['install'], { stdio: 'inherit' });
    spawn('bower', ['install'], { stdio: 'inherit' });
  });

  // RWRW
  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  var welcome =
  'This generator will scaffold and wire a Jekyll site. Yo, Jekyll!'.yellow.bold +
  '\n ';

  // Multiple choice options
  // RWRW for validation in the future
  var cssPrep      = ['s','c','n'];
  var jsPrep       = ['c','n'];
  var templateType = ['d','H5'];
  var jekPost      = ['d','p','n'];
  var jekMkd       = ['m','rd','k','rc'];

  console.log(welcome);

  // TODO: Rewrite when conditional prompts land in Yeoman Generator
  //       Silent to hidden, if it's accepted, but better as separate
  //       prompts with consol.log messages in between.
  var prompts = [{
    name: 'titleDirs',
    message: 'First let\'s set up some directories.'.yellow + ' ☛',
    silent: true
  },
  {
    name: 'cssDir',
    message: 'Choose a css directory:',
    default: 'css/'
  },
  {
    name: 'jsDir',
    message: 'Choose a javascript directory:',
    default: 'js/'
  },
  {
    name: 'imgDir',
    message: 'Choose an image file directory:',
    default: 'images/'
  },
  // Tools and Preprocessors
  {
    name: 'titleTools',
    message: 'Wire up tools and preprocessors.'.yellow + ' ☛',
    silent: true
  },
  {
    name: 'cssPrep',
    message: 'Use a css preprocessor?\n s: Sass\n c: Sass & Compass\n n: none',
    default: 'n'
  },
  {
    name: 'cssPrepDir',
    message: 'If so, choose a css preprocessor file directory:',
    default: 'scss/'
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
  },
  {
    name: 'requireJs',
    message: 'Use Require.js?',
    default: 'y/N'
  },
  // Templates
  {
    name: 'titleTemplates',
    message: 'Choose template components.'.yellow + ' ☛',
    silent: true
  },
  {
    name: 'templateType',
    message: 'Choose a Jekyll site template\n d:  Default\n H5: HTML5 ★ Boilerplate',
    default: 'd'
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
  },
  // Configure Jekyll
  // Auto populate when magicDefaults land in Yeoman Generator, make editable with edit: true
  {
    name: 'titleConfig',
    message: 'And last, let\'s configure Jekyll.'.yellow + ' ☛',
    silent: true
  },
  {
    name: 'jekAuthor',
    message: 'Your Name:'
  },
  // If H5BP
  {
    name: 'humansEmail',
    message: 'Your Email:'
  },
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
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // Delete unused title objects just in case
    // TODO: Remove when we have split/conditional prompts
    delete props.titleDirs;
    delete props.titleTools;
    delete props.titleTemplates;
    delete props.titleConfig;

    // manually deal with the response, get back and store the results.
    // Convert some 'default' and 'none' multiple choice answers to false
    if ((/n/i).test(props.cssPrep)) {
      this.cssPrep      = false;
    }
    if ((/n/i).test(props.jsPrep)) {
      this.jsPrep       = false;
    }
    if ((/d/i).test(props.templateType)) {
      this.templateType = false;
    }

    // Convert y/n answers to booleans
    // Default yes
    this.h5bpCss       = (/y/i).test(props.h5bpCss);
    this.h5bpJs        = (/y/i).test(props.h5bpJs);
    // Default no
    this.requireJs     = !(/n/i).test(props.requireJs);
    this.h5bpIco       = !(/n/i).test(props.h5bpIco);
    this.h5bpDocs      = !(/n/i).test(props.h5bpDocs);
    this.h5bpAnalytics = !(/n/i).test(props.h5bpAnalytics);
    this.jekPyg        = !(/n/i).test(props.jekPyg);


    // this.jekPost      = (/y/i).test(props.jekPost);
    // this.jekMkd       = (/y/i).test(props.jekMkd);

    console.log(props);

    cb();
  }.bind(this));
};

// RWRW Next step.
// Revise proj files with new prompts?
// start testing and copying.

Generator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
};

Generator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

/////////////////
// NOTES

// Alternatively they can install with this.bowerInstall(['jquery', 'underscore'], { save: true });
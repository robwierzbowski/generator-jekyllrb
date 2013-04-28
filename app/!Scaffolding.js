//  yeoman.generators.Base.apply(this, arguments);

  // Specify an appname from the command line, or use dir name
  //this.argument('appname', { type: String, required: false });
  //this.appname = this.appname || path.basename(process.cwd());

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



bowerrc
bower.json

editorconfig

gitattributes
gitignore

Gruntfile.js

package.json

readme.md

jshintrc

travis.yml



// Scaffolding

// tools
//   Scaffold + wire preproc Css

//   Scaffold + wire preproc JS

//   (req)

// Scaffold Template?

// Jek Config

// remove files
// transfer / copy files


// app
// default
// conditional
//   def-template
//   h5-css
//   h5-js
//   h5-icons
//   h5-docs
//   h5-template
//   sass
//   coffee


//templates pulls in all jek config too.

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
      // rename css to scss, add as partials.
        // scss/default dir?
      // GRUNTFILE
      // package.json grunt-contrib-
      // default.html
      // if pygments, copy/ move, add as partial delete syntax.css
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

  // Jek markdown choice, make sure that corect gems are installed
      // BUNDLER?
# Generator-jekyllrb 

**A Yeoman generator, workflow, and build system for the Jekyll site generator. Yo, Jekyllrb!**

Generator-jkyllrb wraps the [Jekyll](http://jekyllrb.com/) static site generator in a [Yeoman](http://yeoman.io/) development workflow. Scaffold a site with Yo, manage front end packages with [Bower](http://bower.io/), and run development and build tasks with [Grunt](http://gruntjs.com/). Choose Css and Javascript preprocessors, Jekyll's standard template or the [HTML5 Boilerplate](http://html5boilerplate.com/), lint and run reports on your code, minify and add revision hashes to your assets — all the modern web development practices you know you should be doing. Generator-jekyllrb makes it easy.

## Quick start

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-jekyllrb`
- Run: `yo jekyllrb`
- If you've chosen preprocessors, review readmes in their directories.
- Start coding!

## Scaffolding options

Yeoman is an opinionated developer workflow. Developers are opinionated too. Generator-jekyllrb sets up a Grunt workflow so you don't have to, but lets you control the structure and toolset for your site and add some basic configuration while you're at it.

#### Template choice

Choose between the default Jekyll site template and the [HTML5 ★ Boilerplate](http://html5boilerplate.com/), with Grunt task integration baked in.

#### Preprocessors

[Sass](http://sass-lang.com/), [Compass](http://compass-style.org/), and [Coffeescript](http://coffeescript.org/) are available if you want them. Seriously, give the word and the generator will download, install, and configure your preprocessors and bundle them together in a convienient Grunt task. That's it, no Codekit or `compass watch` needed.

#### Directory structure

Yes friend, we're not telling you what to do here. `_scss`, `assets`, `src`, `lib` — name your directories whatever you like and generator-jekyllrb will build them, configure tasks, and move all default assets to where they belong.

#### Jekyll Configuration

That's what we're here for, right? The generator helps you set some simple options, configures Jekyll for grunt integration, and handles installation of extra libraries (e.g., markdown processors like [redcarpet](https://github.com/vmg/redcarpet)) if it needs to.


## Get to work

Once you've scaffolded the site, there are some handy Grunt tasks available to you.

#### `grunt server`

Compiles everything and fires up a static server with Livereload for the development sweetness. Change a file, watch it recompile and change in the browser without a refresh. Use the target `:build` (as in `grunt server:build`) to run the site through the build process, launch a server, and review before deployment.

#### `grunt report`

Gives you reports on the quality of your code with [Jshint](http://www.jshint.com/), [CssLint](http://csslint.net/), and [CSSCSS](http://zmoazeni.github.io/csscss/). BAMF you just became a better developer. All reports are configurable through the Gruntfile or .\*rc setting files.

#### `grunt build`

Runs your site through a buld process that combines files, minifies [css](https://github.com/gruntjs/grunt-contrib-cssmin), [images](https://github.com/gruntjs/grunt-contrib-imagemin), and [html](https://github.com/gruntjs/grunt-contrib-htmlmin), [uglifies js](https://github.com/gruntjs/grunt-contrib-uglify), and revvs everything to bust caches. Read the [Usemin documentation](https://github.com/yeoman/grunt-usemin) for more details, or just play around with it. Awesome.

#### `grunt` (default) and more

`grunt` by itself runs reports and then builds your site. There are many individual task and targets in the Gruntfile, all of which are also available on the command line, so read through that thing. And Grunt's so easy to use you'll probably want to [set up some of your own](http://gruntjs.com/configuring-tasks).

## Options

`yo` takes some command line options.

`--skip-install` skips the automatic execution of Bower and npm after scaffolding has finished.

## Workflow

A full workflow example, from scaffolding to development, to build and deployment, is coming.

## Contribute

Report bugs and feature proposals in the [Github issue tracker](https://github.com/robwierzbowski/generator-jekyllrb/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](https://github.com/gruntjs/grunt).

## To Do

- Document workflow
- Add stylus and require.js
- Add a Categories subgenerator
- Add task to bump versions
- Add grunt-bower-install
- Add an option to specify all scaffolding options through a json file

## Release History

0.1.1, May 21, 2013: Documentation updates.
0.1.0, May 21, 2013: Initial release.

## License
[BSD-new License](http://en.wikipedia.org/wiki/BSD_License)

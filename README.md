# Generator-jekyllrb 

**A Yeoman generator, workflow, and build system for the Jekyll static site generator. Yo, Jekyllrb!**

Generator-jekyllrb wraps the [Jekyll](http://jekyllrb.com/) static site generator in a [Yeoman](http://yeoman.io/) development workflow. Scaffold a site with Yo, manage front end packages with [Bower](http://bower.io/), and run development and build tasks with [Grunt](http://gruntjs.com/). Start with Jekyll's standard template or the [HTML5 Boilerplate](http://html5boilerplate.com/), use Css and Javascript preprocessors, lint and run reports on your code, minify and add revision hashes to your assets — all the modern web development practices you know you should be doing. Generator-jekyllrb makes it easy.

Generator-jekyllrb doesn't install themes or provide a finished site out of the box. It's for developers who want a solid starting point and a modern workflow with which to build a site themselves. It's also a great way to get familiar with Yeoman, Grunt, and Bower without knowing any javascript MVC frameworks.

## Quick start

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-jekyllrb`
- Run: `yo jekyllrb`
- If you've chosen preprocessors, review readmes in their directories.
- Start coding!

## Scaffolding options

Yeoman is an opinionated developer workflow. Developers are opinionated too. Generator-jekyllrb lets you make the important decisions — site structure, toolset, and site configuration — while it sets up a Grunt workflow for you.

#### Template choice

Choose between the default Jekyll site template and the latest [HTML5 ★ Boilerplate](http://html5boilerplate.com/), with Grunt task integration baked in.

#### Preprocessors

[Sass](http://sass-lang.com/), [Compass](http://compass-style.org/), and [Coffeescript](http://coffeescript.org/) are available if you want them. Seriously, give the word and the generator will download, install, and configure your preprocessors and bundle them together in a convenient Grunt task. No Codekit, guard, or `compass watch` needed.

#### Directory structure

We're not telling you what to do here. `_scss`, `assets`, `src`, `lib` — name and organize directories however you like and generator-jekyllrb will build them, configure tasks, and move all default assets to where they belong.

#### Jekyll Configuration

Jekyll is what this is all about, right? The generator streamlines site creation by letting you set some simple options, configuring Jekyll for Grunt integration, and installing any extra libraries (e.g., markdown processors like [redcarpet](https://github.com/vmg/redcarpet)) if they're needed.


## Get to work

Once scaffolding is finished you have some handy Grunt tasks available. These help you develop your site, test it, and build an optimized distribution for deployment.

#### `grunt server`

This is your development workhorse. Compiles everything, fires up a static server with Livereload, and opens a browser for you to test in. When you change a source file Grunt will automatically recompile assets and reload the browser in place. Sweet.

You can usse the target `:build` (as in `grunt server:build`) to run the site through the build process, launch a server, and review your site before deployment.

#### `grunt report`

Gives you reports on the quality of your code with [Jshint](http://www.jshint.com/), [CssLint](http://csslint.net/), and [CSSCSS](http://zmoazeni.github.io/csscss/). BAMF you just became a better developer. All reports are configurable through the Gruntfile or the task's .\*rc setting files.

#### `grunt build`

Ready to deploy another of your bad creations? `build` runs your site through a buld process that combines files, minifies [css](https://github.com/gruntjs/grunt-contrib-cssmin), [images](https://github.com/gruntjs/grunt-contrib-imagemin), and [html](https://github.com/gruntjs/grunt-contrib-htmlmin), [uglifies js](https://github.com/gruntjs/grunt-contrib-uglify), and revvs everything to bust caches. The built site is output in a 'dist' folder, which you can version control separately and deploy as you see fit. Read the [Usemin documentation](https://github.com/yeoman/grunt-usemin) for more details, or just play around with it. Awesome.

#### `grunt` (default) and more

`grunt` by itself is a custom task that runs reports and then builds your site. There are many individual task and targets in the Gruntfile, all of which are available for you to use on the command line, so read through that thing. And Grunt's so easy to use you'll probably want to [set up some of your own](http://gruntjs.com/configuring-tasks).

## Command line options

`yo` takes some command line options.

`--skip-install` skips the automatic execution of Bower and npm after scaffolding has finished.

## Workflow

A full workflow example, including scaffolding, development, managing components with Bower, building a distribution, and deploying is coming. 

## Contribute

Report bugs and feature proposals in the [Github issue tracker](https://github.com/robwierzbowski/generator-jekyllrb/issues). In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](https://github.com/gruntjs/grunt).

## To Do

- Document workflow and deployment options
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

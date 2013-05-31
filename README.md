# Generator-jekyllrb 

**A Yeoman generator, workflow, and build system for the Jekyll static site generator. Yo, Jekyllrb!**

Generator-jekyllrb wraps the [Jekyll](http://jekyllrb.com/) static site generator in a [Yeoman](http://yeoman.io/) development workflow. Scaffold a site with Yo, manage front end packages with [Bower](http://bower.io/), and run development and build tasks with [Grunt](http://gruntjs.com/). Generator-jekyllrb aims to provide a solid baseline for modern development with a flexible structure and toolset to accommodate a variety of developer preferences. It's also a great way to get familiar with Yeoman generators and workflow if you don't know any javascript MVx frameworks.

**Generator options:**

- Default Jekyll or [HTML5 Boilerplate](http://html5boilerplate.com/) templates
- Fully configurable directory structure
- [Compass](http://compass-style.org/), [Sass](http://sass-lang.com/), or vanilla CSS
- [Autoprefixer](https://github.com/ai/autoprefixer) CSS post-processor
- [Coffeescript](http://coffeescript.org/) or vanilla javascript
- Common Jekyll configuration options

**Workflow features:**

- Built in server with livereload
- Code linting with [Jshint](http://www.jshint.com/), [CssLint](http://csslint.net/), and [CSSCSS](http://zmoazeni.github.io/csscss/)
- Build process with asset minification, uglification, and revving

## Requirements

Just the basics: [Node.js](http://nodejs.org/) and npm, [Ruby](http://www.ruby-lang.org/) 1.9+ and [Bundler](http://gembundler.com/). The generator will install everything else.

## Quick start

- Make sure you have yo installed: `npm install -g yo`
- Install the generator: `npm install -g generator-jekyllrb`
- Run: `yo jekyllrb`

## Workflow

Once you've scaffolded your site there are some handy Grunt tasks available to help you develop, test, and build.

#### `grunt server`

This is your development workhorse. Running `grunt server` starts a watch task for preprocessor files, starts a server, and opens the site in your default browser. The server uses livereload to inject code changes into the browser automatically — there's no need to manually refresh.

You can use the `:build` target (`grunt server:build`) to run the build process, start a server, and review your site before deployment.

*__Note for Windows users:__ if the server fails on launch try refreshing your browser or moving the lrSnippet in the Grunt `connect` task below other middleware. [The issue is being addressed in generator-webapp](https://github.com/yeoman/generator-webapp/issues/63).* 

#### `grunt report`

Reports are similar to tests, but they check code quality instead of functionality. `grunt report` checks code with [Jshint](http://www.jshint.com/), [CSS Lint](http://csslint.net/) and [CSSCSS](http://zmoazeni.github.io/csscss/). BAMF! You just became a better developer. 

You can configure report options in the Gruntfile or the task's '.rc' files.

#### `grunt build`

When you're ready to publish your site, run `grunt build` to send it through a build process. [Usemin blocks](https://github.com/yeoman/grunt-usemin#the-useminprepare-task) are concatenated, [CSS](https://github.com/gruntjs/grunt-contrib-cssmin), [images](https://github.com/gruntjs/grunt-contrib-imagemin), and [HTML](https://github.com/gruntjs/grunt-contrib-htmlmin) are minified, [javascript is uglified](https://github.com/gruntjs/grunt-contrib-uglify), assets are [revved](https://github.com/cbas/grunt-rev), and the final optimized site is output to the 'dist' folder. 

#### `grunt (default)` and individual tasks

`grunt` is a custom task that runs reports and builds your site with a single command. There are many individual tasks and targets in the Gruntfile, all of which are available on the command line. Read through the Gruntfile for the complete list; it's often useful to run tasks like `jshint:all` and `compass:server` by themselves. Edit them when necessary, and [set up some of your own](http://gruntjs.com/configuring-tasks).
 
#### Bower, components, and Usemin

[Bower](http://bower.io/) is a front-end package manager. It's awesome. Use it to download and manage CSS, javascript, Sass, and Compass components for your site. 

While developing with `grunt server` everything in the `bower_components` directory is available.

To include components in the build either place them inside of a Usemin block, or add them manually to the `copy:dist` task.

## Contribute

Report bugs and feature proposals in the [Github issue tracker](https://github.com/robwierzbowski/generator-jekyllrb/issues). In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](https://github.com/gruntjs/grunt).

## To Do

- Add deployment options
- Add stylus and require.js
- Add a categories subgenerator
- Add grunt-bower-install

## Release History

0.2.4, May 31, 2013: Minor improvements, documentation update.  
0.2.3, May 30, 2013: Documentation update.  
0.2.2, May 30, 2013: Gruntfile and Bower workflow refinement.  
0.2.1, May 30, 2013: Bugfixes.  
0.2.0, May 29, 2013: Add Autoprefixer, rewrite Grunt workflow, bugfixes.  
0.1.3, May 29, 2013: Bugfixes.  
0.1.2, May 24, 2013: Documentation updates, name change.  
0.1.1, May 21, 2013: Documentation updates.  
0.1.0, May 21, 2013: Initial release.

## License
[BSD-new License](http://en.wikipedia.org/wiki/BSD_License)

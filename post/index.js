'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

// Prompts
Generator.prototype.askForDetails = function askForDetails() {
  var cb = this.async();
  var prompts = [{
    name: 'title',
    message: 'Name',
    default: 'Hello World'
  },
  {
    name: 'layout',
    message: 'Layout',
    default: 'post'
  }];

  this.prompt(prompts, function (props) {
    this.layout  = props.layout;
    this.title   = props.title;
    cb();
  }.bind(this));
};

Generator.prototype.templates = function templates() {
  var date = new Date();
  var formattedDate = date.toISOString().split('T')[0];
  var postName = this._.slugify(this._.humanize(this.title));
  this.template('post.md', 'app/_posts/' + formattedDate + '-' + postName + '.md');

};
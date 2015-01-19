/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;


describe('jekyll generator', function () {

  var runGen;

  beforeEach(function (done) {
    runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    done();
  });

  it('creates expected files', function (done) {
    runGen.withOptions({'skipInstall':true})
    .on('end', function () {
      var expected = [
        // add files you expect to exist here.
        '.bowerrc',
        '.csslintrc',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.jshintrc',
        '_config.build.yml',
        '_config.yml',
        'app/_layouts/default.html',
        'app/_layouts/post.html',
        // todo: have to be careful with dates.
        // 'app/_posts/2015-01-18-welcome-to-jekyll.md',
        // 'app/_posts/2015-01-18-yo-jekyllrb.md',
        'app/css/main.scss',
        'app/index.html',
        'app/js/main.js',
        'bower.json',
        'Gemfile',
        'Gruntfile.js',
        'package.json'
      ];
      assert.file(expected);
      done();
    });
  });

});

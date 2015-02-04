/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;


describe('jekyll generator', function () {

  var runGen;
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
    'bower.json',
    'Gemfile',
    'Gruntfile.js',
    'package.json'
  ];
  var expectedDefault = [
    'app/css/main.scss',
    'app/index.html',
    'app/js/main.js'
  ];
  var expectedH5BP = [
    'app/css/main.css',
    'app/index.html',
    'app/js/main.js'
  ];

  beforeEach(function (done) {
    runGen = helpers
        .run(path.join(__dirname, '../app'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    done();
  });

  it('creates expected files', function (done) {
    runGen.withOptions({'skipInstall':true})
    .inDir(path.join(__dirname, 'temp'))
    .on('end', function () {
      assert.file(expected);
      assert.file(expectedDefault);
      done();
    });
  });

  it('creates expected files', function (done) {
    runGen.withOptions({'skipInstall':true})
    .withPrompts({ templateType: 'HTML5 ★ Boilerplate' })
    .inDir(path.join(__dirname, 'temp'))
    .on('end', function () {
      assert.file(expected);
      assert.file(expectedH5BP);
      done();
    });
  });

  it('can handle directories with special characters.', function (done) {
    runGen.withOptions({'skipInstall':true})
    .inDir(path.join(__dirname, 'temp', 'with characters (special)'))
    .on('end', function () {
      assert.file(expected);
      assert.file(expectedDefault);
      done();
    });
  });
});

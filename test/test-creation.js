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
        '.jshintrc',
        '.editorconfig'
      ];
      assert.file(expected);
      done();
    });
  });

});

/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('jekyll generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('jekyllrb:app', [
        '../../app'
      ]);
      // XXX: can't change options with yeoman-generator 0.13.4
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'localInstall': true
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});

var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var username = require('username');
var should = require('should');
var metrics = require('../lib/local-test-metrics');

// for testable
process.env.LOCAL_METRICS_ALT_DIRECTORY = path.dirname(__dirname);

describe('store metrics', function () {

  before('remove metrics file', function (done) {

    rimraf(path.resolve(__dirname, '..', 'local-test-metrics'), done);

  });

  [1, 2, 3, 4, 5, 6].forEach(function (i) {

    before('update titled metric', function (done) {
      done = metrics('metric-name', done);
      setTimeout(done, i * 25);
    });

  });

  it('stores metrics in a file', function (done) {

    var userName = username.sync();
    var filename = path.resolve(__dirname, '..',
      'local-test-metrics', userName, 'metric-name.csv');

    var file = fs.readFileSync(filename);

    var lines = file.toString().split('\n');

    lines.length.should.equal(8);

    done();

  });

});

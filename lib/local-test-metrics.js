var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var username = require('username');
var getCallerFile = require('./get-caller-file');

module.exports = Metric;

function Metric(title, done) {
  var callerFile = getCallerFile();
  var userName = username.sync();
  var metricFile = getMetricFile(title);

  var metricsDirectory =
    process.env.LOCAL_METRICS_ALT_DIRECTORY ||
    getMetricsBaseDirectory(callerFile);

  // maybe log issue, not found base directory
  if (!metricsDirectory) return done;

  var version = require(metricsDirectory + '/package.json').version;

  var filename = path.resolve(
    metricsDirectory, 'local-test-metrics', userName, metricFile);

  var start = process.hrtime();

  return function newDone(err) {
    if (err) return done(err);

    var duration = process.hrtime(start);

    mkdirp.sync(path.dirname(filename));
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, 'duration (ms), version, time (ISO)\n');
    }
    fs.appendFileSync(filename,
      duration[0] + '.' + duration[1] + ', ' +
      version + ', ' +
      (new Date()).toISOString() + '\n'
    );

    done();
  }
}


function getMetricFile(title) {
  // replace spaces with under scores
  while (title.match(/\s/)) {
    title = title.replace(/\s/, '_');
  }
  return title + '.csv';
}

function getMetricsBaseDirectory(callerFile) {
  var directory = callerFile;
  var i = 5;
  while (i--) {
    directory = path.resolve(directory, '..');
    if (fs.existsSync(path.resolve(directory, 'package.json'))) {
      return directory
    }
  }
  return null;
}

# Mocha Local Test Metrics

```javascript
var metrics = require('local-test-metrics');

describe('thing', function () {

  it('a test', function (done) {

    // create metric with short name
    // returns new done callback
    
    done = metrics('metric-name', done);

    setTimeout(function () {
      
      // calling the new done completes the test
      // and logs the test duration
      
      done();
      
    }, 500);

  });

});
```

It will then create a file contiaining test durations that is updated with each test run.

`project_root/local-test-metrics/username/metric-name.csv`

```
duration (ms), version, time (ISO)
0.27207845, 1.0.0, 2017-09-11T06:28:59.300Z
0.52228942, 1.0.0, 2017-09-11T06:28:59.354Z
0.80104832, 1.0.0, 2017-09-11T06:28:59.435Z
0.104199743, 1.0.0, 2017-09-11T06:28:59.540Z
0.127418826, 1.0.0, 2017-09-11T06:28:59.668Z
0.154192254, 1.0.0, 2017-09-11T06:28:59.824Z
```

If the metric metric name contains spaces they will be converted to underscores (personal reasons).
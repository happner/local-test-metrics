module.exports = GetCallerFile;

function GetCallerFile() {
  // get the .js filename of the first external function
  var thisFile;
  var callingFile;
  var origStackFn = Error.prepareStackTrace;

  try {
    var err = new Error();

    Error.prepareStackTrace = function (err, stack) {
      return stack;
    }

    thisFile = err.stack.shift().getFileName();
    while (err.stack.length) {
      callingFile = err.stack.shift().getFileName();
      if (
        thisFile !== callingFile &&
        !callingFile.match(/local\-test\-metrics\.js/)
      ) break;
    }
  } catch (e) {}

  Error.prepareStackTrace = origStackFn;
  return callingFile;
}

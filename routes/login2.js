//OK! Let't work around using phantomjs!


var run = function(req, res, next){
  console.log("Logging In...")

  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_login.js'),
    req.body.userid,
    req.body.userpw
  ]

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    res.send(stdout);
    // handle results
  })

}

module.exports = run;

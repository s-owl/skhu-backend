//OK! Let't work around using phantomjs!


var run = function(req, res, next){
  console.log("POST /user/login")
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  // Arguments
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph/ph_login.js'),
    req.body.userid,
    req.body.userpw
  ]

  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    // pass cookies to the client
    res.send(stdout);
  })

}

module.exports = run;

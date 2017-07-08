//OK! Let't work around using phantomjs!

// 로그인 작업을 수행
var run = function(req, res, next){
  console.log("POST /user/login")
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  // 명령행 인자값들을 담는 배열
  var childArgs = [
<<<<<<< HEAD
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph/ph_login.js'),
    req.body.userid,
    req.body.userpw
=======
    '--ignore-ssl-errors=yes', // SSL 오류 무시
    path.join(__dirname, 'ph_login.js'), // 자식 프로세스로 실행할 phantom.js 스크립트
    req.body.userid, // 학번
    req.body.userpw // 비밀번호
>>>>>>> e2e51c71e4b4c98dd710ad2a8c7d333c4d0606ce
  ]

  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    // pass cookies to the client
    res.send(stdout);
  })

}

module.exports = run;

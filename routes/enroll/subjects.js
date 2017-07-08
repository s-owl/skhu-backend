//var utils = require('../utils');
var jsdom = require('jsdom');
// 개설과목 조회
var run = function(req, res, next){
  console.log("POST /enroll/subjects");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  var cookie = {}; // 요청으로부터의 쿠키를 얻어서 저장할 배열
  for( var i = 0; i<req.body.cookie.length; i++){
    cookie[i] = req.body.cookie[i];
  }

  // 자식 프로세스로 실행할 명령행의 인자
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_subjects.js'),
    req.body.year, // 년도
    req.body.semester, // 학기
    req.body.depart, // 학과(학부)
    req.body.professor, // 교수명
    // 쿠키값
     cookie[0].domain,
     cookie[0].httponly,
     cookie[0].name,
     cookie[0].path,
     cookie[0].secure,
     cookie[0].value,
     cookie[1].domain,
     cookie[1].httponly,
     cookie[1].name,
     cookie[1].path,
     cookie[1].secure,
     cookie[1].value,
     cookie[2].domain,
     cookie[2].httponly,
     cookie[2].name,
     cookie[2].path,
     cookie[2].secure,
     cookie[2].value,
     cookie[3].domain,
     cookie[3].httponly,
     cookie[3].name,
     cookie[3].path,
     cookie[3].secure,
     cookie[3].value
  ]

  // 자식 프로세스로 phantom.js 스크립트를 실행
  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    // 자식 프로세서에서 출력한 표준출력을 파싱
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        if(err==undefined){
          // 조회 결과 데이터 파싱
          var subjects = [];
          window.$("#dgList > tbody > tr")
            .each(function(index, element){
              subjects.push({
                "type" : window.$( element ).children("td:eq(0)").text(),
                "grade" : window.$( element ).children("td:eq(1)").text(),
                "code" : window.$( element ).children("td:eq(2)").text(),
                "class" : window.$( element ).children("td:eq(3)").text(),
                "subject" : window.$( element ).children("td:eq(4)").text(),
                "credits" : window.$( element ).children("td:eq(5)").text(),
                "tutor" : window.$( element ).children("td:eq(6)").text(),
                "grade_restriction" : window.$( element ).children("td:eq(7)").text(),
                "depart_restriction" : window.$( element ).children("td:eq(8)").text(),
                "time_location" : window.$( element ).children("td:eq(9)").text(),
                "note": window.$( element ).children("td:eq(10)").text(),
                "headcounts": window.$( element ).children("td:eq(11)").text()
              });
            });

            // JSON 으로 처리하여 클라이언트에 응답.
            res.send(JSON.stringify({
              "subjects" : subjects
            }));
        }
      });
  })

  // utils.phFormTask(req, res, next, url, true, jsondata)
  // .then(function(window, rawData){
  //   // Parse subjects data
  //   var jsonSubjects = [];
  //   window.$("#dgList > tbody > tr")
  //     .each(function(index, element){
  //       if(index>=1){
  //         jsonSubjects.push({
  //           "type" : window.$( element ).children("td:eq(0)").text(),
  //           "grade" : window.$( element ).children("td:eq(1)").text(),
  //           "code" : window.$( element ).children("td:eq(2)").text(),
  //           "class" : window.$( element ).children("td:eq(3)").text(),
  //           "subject" : window.$( element ).children("td:eq(4)").text(),
  //           "credits" : window.$( element ).children("td:eq(5)").text(),
  //           "tutor" : window.$( element ).children("td:eq(6)").text(),
  //           "grade_restriction" : window.$( element ).children("td:eq(7)").text(),
  //           "depart_restriction" : window.$( element ).children("td:eq(8)").text(),
  //           "time_location" : window.$( element ).children("td:eq(9)").text(),
  //           "note": window.$( element ).children("td:eq(10)").text(),
  //           "headcounts": window.$( element ).children("td:eq(11)").text()
  //         });
  //       }
  //     });
  //   res.send(JSON.stringify({
  //     "subjects" : jsonSubjects
  //   }));
  // });

}

module.exports = run;

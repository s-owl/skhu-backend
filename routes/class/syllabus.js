var jsdom = require('jsdom');
// 강의 계획서 조회
var run = function(req, res, next){
  console.log("POST /class/syllabus");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  // 요청 바디에서 쿠키값 로드
  var cookie = {};
  for( var i = 0; i<req.body.cookie.length; i++){
    cookie[i] = req.body.cookie[i];
  }

  // 자식 프로세스로 실행할 명령행 인자
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_syllabus.js'),
    req.body.year, // 년도
    req.body.semester, // 학기
    req.body.type, // 유형
    req.body.keyword, // 검색 키워드
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

  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, (err, stdout, stderr)=>{
    console.log(err, stdout, stderr);
    // 표준 출력(stdout) 으로 받은 것을 파싱
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      (err, window)=>{
        if(err==undefined){
          // 강의계획서 검색 결과 파싱
          var syllabus = [];
          window.$("#dgList > tbody > tr")
            .each((index, element)=>{
              syllabus.push({
                "code" : window.$( element ).children("td:eq(0)").text(),
                "subject" : window.$( element ).children("td:eq(1)").text(),
                "grade" : window.$( element ).children("td:eq(2)").text(),
                "semester" : window.$( element ).children("td:eq(3)").text(),
                "class" : window.$( element ).children("td:eq(4)").text(),
                "type" : window.$( element ).children("td:eq(5)").text(),
                "depart" : window.$( element ).children("td:eq(6)").text(),
                "professor" : window.$( element ).children("td:eq(7)").text(),
                "isopened" : window.$( element ).children("td:eq(8)").text(),
                "url" : processIntoUrl(window.$( element ).children("td:eq(8)").html(),
                            window.$( element ).children("td:eq(8)").text()),
                "writted" : window.$( element ).children("td:eq(9)").text(),
              });
            });

            // JSON 으로 처리하여 클라이언트에 응답
            res.send(JSON.stringify({
              "syllabus" : syllabus
            }));
        }
      });
    // pass cookies to the client
    // res.send(stdout);
  })
}

// 강의계획서 상세사항 URL 처리 함수
function processIntoUrl(rawTag, isOpened){
  var utils = require('../utils');
  if(isOpened == "공개"){
      var rawstr = rawTag.split("&quot;"); // &quot 를 기준으로 쪼개기
      console.log(rawstr[1]);
      var data = rawstr[1].split("|"); // rawstr[1] 을 | 를 기준으로 쪼개서 배열로 저장
      console.log(data);
      // 쪼개기로 만들 배열의 요소와 문자열을 조합하여 URL 만들기
      var url = `${utils.forestBaseUrl}/Gate/SAM/Lesson/WEB/SSEW02O.aspx?Y=${data[10]}&HG=${data[11]}&GC=${data[12]}
            &DC=${data[13]}&HC=${data[14]}&SC=${data[15]}&HN=${data[16]}&BB=${data[17]}&SB=${data[18]}`;
      console.log(url);
      return url;
  }else{
    return "";
  }
}

module.exports = run;

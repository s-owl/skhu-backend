const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;

var searchClassroom = function(req, res, next){
  var url = "https://forest.skhu.ac.kr/Gate/SAM/Lesson/COREControl/SSEX03O.aspx?id=objRoom&arg1=2&arg2=1406";
  // type : name, code
  // keyword : <String>

  console.log("POST /class/timetable_classroom/search");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 요청 바디에서 쿠키값 로드
  var cookie = {};
  for( var i = 0; i<req.body.cookie.length; i++){
    cookie[i] = req.body.cookie[i];
  }

  // 자식 프로세스로 실행할 명령행 인자
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_search_classroom.js'),
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
          var classrooms = [];
          window.$("#dgList > tbody > tr")
            .each((index, element)=>{
              classrooms.push({
                'code' : window.$( element ).children("td:eq(0)").text(),
                'building' : window.$( element ).children("td:eq(1)").text(),
                'roomcode' : window.$( element ).children("td:eq(2)").text(),
                'name' : window.$( element ).children("td:eq(3)").text(),
                'devices' : {
                  'mic' : window.$( element ).children("td:eq(4)").text(),
                  'tv' : window.$( element ).children("td:eq(5)").text(),
                  'dvd' : window.$( element ).children("td:eq(6)").text(),
                  'scrn' : window.$( element ).children("td:eq(7)").text(),
                  'dkscrn' : window.$( element ).children("td:eq(8)").text(),
                  'crt' : window.$( element ).children("td:eq(9)").text(),
                  'etc' : window.$( element ).children("td:eq(10)").text()
                },
                'capacity' : window.$( element ).children("td:eq(11)").text()
              });
            });
            res.send({
              'classrooms' : classrooms
            })
        }});
}

exports.searchClassroom = searchClassroom;

var getTimetableOfClassroom = function(){
  var url = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA32S.ASPX?&maincd=O&systemcd=S&seq=1";
}

exports.getTimetableOfClassroom = getTimetableOfClassroom;

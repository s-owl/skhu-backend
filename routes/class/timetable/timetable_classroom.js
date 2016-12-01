const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;
const jsdom = require('jsdom');

const searchClassroom = function(req, res, next){
  // type : <String> - N - name, C - code
  // keyword : <String>

  console.log("POST /class/timetable/classroom/search");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 요청 바디에서 쿠키값 로드
  let cookie = [];
  for(let i = 0; i<req.body.cookie.length; i++){
    cookie[i] = req.body.cookie[i];
  }

  // 자식 프로세스로 실행할 명령행 인자
  const childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_timetable_classroom_search.js'),
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
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    // 표준 출력(stdout) 으로 받은 것을 파싱
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      (err, window)=>{
        if(err==undefined){
          let classrooms = [];
          window.$("#dgList > tbody > tr")
            .each((index, element)=>{
              classrooms.push({
                'roomcode' : window.$( element ).children("td:eq(0)").text(),
                'building' : window.$( element ).children("td:eq(1)").text(),
                'placecode' : window.$( element ).children("td:eq(2)").text(),
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
            res.send({
              'classrooms' : classrooms
            });
          });
        }
      });
    });
}
exports.searchClassroom = searchClassroom;

const getTimetableOfClassroom = function(req, res, next){
  const utils = require('../../utils');
  console.log("POST /class/timetable/classroom");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 요청 바디에서 쿠키값 로드
  let cookie = [];
  for(let i = 0; i<req.body.cookie.length; i++){
    cookie[i] = req.body.cookie[i];
  }

  // 자식 프로세스로 실행할 명령행 인자
  const childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_timetable_classroom.js'),
    req.body.year,
    req.body.semester,
    req.body.roomcode,
    req.body.building,
    req.body.name,
    req.body.placecode,
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
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    // 표준 출력(stdout) 으로 받은 것을 파싱
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      (err, window)=>{
        if(err==undefined){
          // 파싱한 데이터를 보관할 배열
          let data = [[],[],[],[],[],[]];

          // id 가 tblTimeSheet 인 테이블의 데이터 긁어오기
          window.$("#tblTimeSheet > tbody > tr")
            .each((index, element)=>{
              if(index>0){
                console.log("========================================");
                for(let i=0; i<6; i++){
                  let items = window.$( element ).children(`td.TT_ItemCell:eq(${i})`)
                    .html().split('<div class="TT_TimeItemValue"><b>');
                  items.forEach((rawitem)=>{
                    let item = rawitem.replace('</div>','');
                    console.log(item);
                    if(item!=undefined && item.length>0){
                      // 줄바꿈 기준으로 쪼개기
                      let splited = item.split('<br>');
                      // 교수 또는 강사
                      let code_tutor = splited[1].replace('(','').replace(')','');
                      let codeval = `${code_tutor.split("-")[0]}-${code_tutor.split("-")[1]}`; // 과목코드
                      // 과목코드로 배열에서 중복되는 요소인지 여부 검사
                      if(utils.isDuplicated(data[i], "code", codeval)==false){
                        data[i].push({
                          "subject" : splited[0].replace('</b>', ''),
                          "code" : codeval,
                          "tutor" : code_tutor.split("-")[2],
                          "time" :  splited[2],
                          "start" : [parseInt(splited[2].split("~")[0].split(":")[0]),
                            parseInt(splited[2].split("~")[0].split(":")[1])],
                          "end" : [parseInt(splited[2].split("~")[1].split(":")[0]),
                            parseInt(splited[2].split("~")[1].split(":")[1])]
                        });
                      }
                    }
                  });
                }
              }
            });

          // JSON 으로 처리하여 클라이언트에 응답
          res.send(JSON.stringify({
              "monday" : data[0],
              "tuesday" : data[1],
              "wednsday" : data[2],
              "thursday" : data[3],
              "friday" : data[4],
              "saturday" : data[5]
          }));
        }
      });
    });
}
exports.getTimetableOfClassroom = getTimetableOfClassroom;

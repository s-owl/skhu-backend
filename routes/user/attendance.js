// cURL 유틸
const curl_utils = require('../curl_utils');
const utils = require('../utils');

// 출결현황 조회
const run = (req, res, next) => {
  console.log("POST /user/attendance");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "http://forest.skhu.ac.kr/Gate/UniMainStudent.aspx";

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window) => {
    const jsonAttendance = [];
    window.$("#gvList > tbody > tr")
      .each( (index, element) => {
        if(index >= 1){
          jsonAttendance.push({
            "subject" : utils.trim(window.$( element ).children("td:eq(0)").text()),
            "time" : utils.trim(window.$( element ).children("td:eq(1)").text()),
            "attend" : utils.trim(window.$( element ).children("td:eq(2)").text()),
            "late" : utils.trim(window.$( element ).children("td:eq(3)").text()),
            "absence" : utils.trim(window.$( element ).children("td:eq(4)").text()),
            "approved" : utils.trim(window.$( element ).children("td:eq(5)").text()),
            "menstrual" : utils.trim(window.$( element ).children("td:eq(6)").text()),
            "early" : utils.trim(window.$( element ).children("td:eq(7)").text())
          });
        }
      });

    // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "attendance" : jsonAttendance
    }));

  }).catch((err) => { console.log(err) });
}

module.exports = run;

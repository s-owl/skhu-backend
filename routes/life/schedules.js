// cURL 유틸
const curl_utils = require('../curl_utils');

// 학사일정 조회
const run = (req, res, next) => {
  console.log("POST /life/schedules");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 학교 홈페이지에서 학사일정 파싱
  const url = "http://skhu.ac.kr/calendar/calendar_list_1.aspx?strYear="+req.body.year+"&strMonth="+req.body.month;

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window) => {
    // 학사 일정 파싱
    const calendar = [];
    window.$("table:eq(1) > tbody > tr")
      .each( (index, element) => {
        if(index > 1){
          calendar.push({
            "period" : window.$( element ).children("td:eq(0)").text(),
            "content" : window.$( element ).children("td:eq(1)").text()
          });
        }
      });

    // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "calendar" : calendar
    }));

  }).catch((err) => { console.log(err) });
}

module.exports = run;

// 팬텀 유틸
var ph_utils = require('../ph_utils');

// 학사일정 조회
var run = function(req, res, next){
  console.log("POST /life/schedules");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 학교 홈페이지에서 학사일정 파싱
  var url = "http://skhu.ac.kr/calendar/calendar_list_1.aspx?strYear="+req.body.year+"&strMonth="+req.body.month;
 
  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {
      // 학사 일정 파싱
      var calendar = [];
      window.$("table:eq(1) > tbody > tr")
        .each(function(index, element){
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

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
}

module.exports = run;

var utils = require('../utils');
// 학사일정 조회
var run = function(req, res, next){
  console.log("POST /page/calendar");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 학교 홈페이지에서 학사일정 파싱
  var url = "http://skhu.ac.kr/calendar/calendar_list_1.aspx?strYear="
    +req.body.year+"&strMonth="+req.body.month;

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    // 학사 일정 파싱
    var calendar = [];
    window.$("table:eq(1) > tbody > tr")
      .each(function(index, element){
        if(index>1){
          calendar.push({
            "period" : window.$( element ).children("td:eq(0)").text(),
            "content" : window.$( element ).children("td:eq(1)").text()
          });
        }
      });

      // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "calendar" : calendar
    }))
  });
}
module.exports = run;

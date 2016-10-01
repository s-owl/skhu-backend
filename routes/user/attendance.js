var utils = require('../utils');

// 출결현황 조회
var run = function(req, res, next){
  console.log("POST /user/attendance");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/Gate/UniMainStudent.aspx";

  // GET 요청 및 파싱 준비
  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
    // Parse credits data
    var jsonAttendance = [];
    window.$("#gvList > tbody > tr")
      .each(function(index, element){
        if(index>=1){
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

  });

}

module.exports = run;

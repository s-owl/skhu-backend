var utils = require('../utils');
// 장학 신청 내역 조회
var run = function(req, res, next){
  console.log("POST /scholarship/history");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.forestBaseUrl+"/GATE/SAM/SCHOLARSHIP/S/SJHS01S.ASPX?&maincd=O&systemcd=S&seq=1";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    // 장학 신청 내역 파싱
    var history = [];
    window.$("#dgList > tbody > tr")
      .each(function(index, element){
           history.push({
            "year" : window.$( element ).children("td:eq(0)").text(),
            "semester" : window.$( element ).children("td:eq(1)").text(),
            "scholarship_name" : window.$( element ).children("td:eq(2)").text(),
            "order" : window.$( element ).children("td:eq(3)").text(),
            "grade" : window.$( element ).children("td:eq(4)").text(),
            "entrance_scholarship" : window.$( element ).children("td:eq(5)").text(),
            "registration_scholarship" : window.$( element ).children("td:eq(6)").text(),
            "benefit" : window.$( element ).children("td:eq(7)").text(),
            "note" : window.$( element ).children("td:eq(8)").text()
          });
      });

      // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "scholarship_history" : history
    }));
  });

}

module.exports = run;

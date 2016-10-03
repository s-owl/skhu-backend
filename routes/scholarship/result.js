var utils = require('../utils');
// 장학 신청 결과 조회
var run = function(req, res, next){
  console.log("POST /scholarship/result");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/GATE/SAM/SCHOLARSHIP/S/SJHS06S.ASPX?&maincd=O&systemcd=S&seq=1";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    // 장학 신청 내역 및 결과 파싱
    var history = [];
    window.$("#dgList > tbody > tr")
    .each(function(index, element){
      history.push({
        "year" : window.$( element ).children("td:eq(0)").text(),
        "semester" : window.$( element ).children("td:eq(1)").text(),
        "date" : window.$( element ).children("td:eq(2)").text(),
        "type" : window.$( element ).children("td:eq(3)").text(),
        "reason" : window.$( element ).children("td:eq(4)").text(),
        "result" : window.$( element ).children("td:eq(5)").text()
      });
    });

    // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "userinfo" : { // 사용자 정보
        "univtype" : window.$("#lblDaehagNm").text(),
        "depart" : window.$("#lblHagbuNm").text(),
        "major" : window.$("#lblSosogNm").text(),
        "course" : window.$("#lblGwajeongNm").text(),
        "id" : window.$("#lblHagbeon").text(),
        "name" : window.$("#lblNm").text(),
        "status" : window.$("#lblHagjeogGbNm").text(),
        "phone" : window.$("#lblHdpNo").text()
      },
      "apply_history" : history
    }))
  });
}
module.exports = run;

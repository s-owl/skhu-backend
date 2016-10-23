var utils = require('../utils');
// 교내 제출용 성적증명서 조회
var run = function(req, res, next){
  console.log("POST /grade/certificate");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.forestBaseUrl+"/GATE/SAM/SCORE/S/SSJS06S.ASPX?&maincd=O&systemcd=S&seq=1";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    // 사용자 정보 저장할 배열
    var userinfo = [];
    var tmpName;
    // 사용자 정보 파싱
    window.$("#Table3 > tbody > tr > td")
    .each(function(index, element){
      console.log("index="+index);
      console.log(window.$( element ).text());
      if(index%2 == 0){
        // index 가 짝수 == 속성 이름
        tmpName = utils.trim(window.$( element ).text());
        console.log("TMPNAME="+tmpName);
      }else{
        // index 가 홀수 == 속성 값
        userinfo.push({
          "name" : tmpName,
          "value" : utils.trim(window.$( element ).text())
        });
      }
    });

    // 상세 성적 정보 배열
    var details = [];
    // 성적 정보 파싱
    window.$("#dgList > tbody > tr")
    .each(function(index, element){
        details.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "code" : window.$( element ).children("td:eq(2)").text(),
          "subject" : window.$( element ).children("td:eq(3)").text(),
          "type" : window.$( element ).children("td:eq(4)").text(),
          "credit": window.$( element ).children("td:eq(5)").text(),
          "grade": window.$( element ).children("td:eq(6)").text()
        });
    });

    // 요약 정보 배열
    var summary = [];
    // 요약 정보 파싱
    for(var i=0; i<17; i++){
      summary.push({
        "type" : window.$("#Table2 > tbody > tr:eq(0) > td:eq("+i+")").text(),
        "credit" : window.$("#Table2 > tbody > tr:eq(1) > td:eq("+i+")").text()
      })
    }

    // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "userinfo" : userinfo,
      "details" : details,
      "summary" : summary,
      "date" : window.$("#lblDt").text()
    }));
  });
};
module.exports = run;

// 팬텀 유틸
var ph_utils = require('../ph_utils');

// 장학 신청 내역 조회
var run = function(req, res, next){
  console.log("POST /scholarship/history");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  var url = ph_utils.forestBaseUrl+"/GATE/SAM/SCHOLARSHIP/S/SJHS01S.ASPX?&maincd=O&systemcd=S&seq=1";

  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {
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

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
}

module.exports = run;

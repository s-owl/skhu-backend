// cURL 유틸
const curl_utils = require('../curl_utils');

// 장학 신청 결과 조회
const run = (req, res, next) => {
  console.log("POST /scholarship/result");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "http://forest.skhu.ac.kr/GATE/SAM/SCHOLARSHIP/S/SJHS06S.ASPX?&maincd=O&systemcd=S&seq=1";

  // 파일별 콜백 함수
  const callbackFunc = (err, window) => {
    if(err == undefined) {
    // 장학 신청 내역 및 결과 파싱
    const history = [];
    window.$("#dgList > tbody > tr")
    .each( (index, element) => {
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
    }));

  } else {
      console.log(err, stdout, stderr);
    }
  };

  // cURL.get() 호출
  curl_utils.get(req, res, url, callbackFunc);
}
module.exports = run;

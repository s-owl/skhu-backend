// cURL 유틸
const curl_utils = require('../curl_utils');

// 장학 신청 내역 조회
const run = (req, res, next) => {
  console.log("POST /scholarship/history");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "http://forest.skhu.ac.kr/GATE/SAM/SCHOLARSHIP/S/SJHS01S.ASPX?&maincd=O&systemcd=S&seq=1";

  // 파일별 콜백 함수
  // const callbackFunc = (err, window) => {
  //   if(err == undefined) {
  //
  //   } else {
  //     console.log(err, stdout, stderr);
  //   }
  // };

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window)=>{
    // 장학 신청 내역 파싱
    const history = [];
    window.$("#dgList > tbody > tr")
      .each( (index, element) => {
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

  }).catch((err)=>{console.log(err)});
}

module.exports = run;

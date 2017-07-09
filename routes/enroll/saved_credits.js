// cURL 유틸
const curl_utils = require('../curl_utils');
const utils = require('../utils');

// 학점 세이브 조회
const run = (req, res, next) => {
  console.log("POST /enroll/saved_credits");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "/Gate/SAM/Lecture/H/SSGH03S.aspx?&maincd=O&systemcd=S&seq=100";


  // 파일별 콜백 함수
  const callbackFunc = (err, window) => {
    if(err == undefined) {

      // 학점 세이브 상세 정보를 보관할 배열
      const details = [];
      // id 가 gvDetails인 테이블 안의 데이터 가져오기
      window.$("#gvDetails > tbody > tr")
      .each( (index, element) => {
        if(index > 0){
          details.push({
            "year" : window.$( element ).children("td:eq(0)").text(),
            "semester" : window.$( element ).children("td:eq(1)").text(),
            "used" : window.$( element ).children("td:eq(2)").text(),
            "available" : window.$( element ).children("td:eq(3)").text()
          });
        }
      });

      // 학점 세이브 요약 데이터 파싱
      const status_nav = "#fvList > tbody > tr > td > table > tbody > tr >";

      // JSON 으로 처리하여 클라이언트에 응답
      res.send(JSON.stringify({
        "status" : {
          "accrued" : utils.trim(window.$(status_nav+"td:eq(0)").text()),
          "accrued_criteria" : utils.trim(window.$(status_nav+"td:eq(1)").text()),
          "used" : utils.trim(window.$(status_nav+"td:eq(2)").text()),
          "used_criteria" : utils.trim(window.$(status_nav+"td:eq(3)").text()),
          "available" : utils.trim(window.$(status_nav+"td:eq(4)").text())
        },
        "details" : details
      }));

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // cURL.get() 호출
  curl_utils.get(req, res, url, callbackFunc);
}

module.exports = run;

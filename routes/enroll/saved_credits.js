const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const utils = require('../utils');

// 학점 세이브 조회
const run = (req, res, next) => {
  console.log("GET /enroll/saved_credits");

  // 파일별 url 설정
  const url = `${utils.forestBaseUrl}/Gate/SAM/Lecture/H/SSGH03S.aspx?&maincd=O&systemcd=S&seq=100`;
  utils.get(req, res, url, true)
    .then((rawData) => {
      const { document } = (new JSDOM(rawData)).window;
      // 학점 세이브 상세 정보를 보관할 배열
      const details = [];
      // id 가 gvDetails인 테이블 안의 데이터 가져오기
      const rawDetails = document.querySelectorAll("#gvDetails > tbody > tr");
      for(let i=1; i<rawDetails.length; i++){
        details.push({
          "year" : rawDetails[i].children[0].textContent,
          "semester" : rawDetails[i].children[1].textContent,
          "used" : rawDetails[i].children[2].textContent,
          "available" : rawDetails[i].children[3].textContent
        });
      }

      // 학점 세이브 요약 데이터 파싱
      const status = document.querySelector("#fvList > tbody > tr > td > table > tbody > tr");

      // JSON 으로 처리하여 클라이언트에 응답
      res.send(JSON.stringify({
        "status" : {
          "accrued" : utils.trim(status.children[0].textContent),
          "accrued_criteria" : utils.trim(status.children[1].textContent),
          "used" : utils.trim(status.children[2].textContent),
          "used_criteria" : utils.trim(status.children[3].textContent),
          "available" : utils.trim(status.children[4].textContent)
        },
        "details" : details
      }));

    })
    .catch((err) => {
      console.log(err);
    });

};

module.exports = run;

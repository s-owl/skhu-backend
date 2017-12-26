const utils = require('../utils');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// 장학 신청 결과 조회
const run = (req, res, next) => {
  console.log("POST /scholarship/result");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = `${utils.forestBaseUrl}/GATE/SAM/SCHOLARSHIP/S/SJHS06S.ASPX?&maincd=O&systemcd=S&seq=1`;
  utils.get(req, res, url, true)
    .then((rawData) => {
      if(rawData.includes("학부 장학금 신청 결과 조회 기간이 아닙니다.")){
        res.sendStatus(204);
      }else{
        const { document } = (new JSDOM(rawData)).window;
        // 장학 신청 내역 및 결과 파싱
        const history = [];
        let items = document.querySelectorAll("table#dgList > tbody > tr");
        for(let i=0; i<items.lengthl; i++){
          history.push({
            "year" : items[i].children[0].textContent,
            "semester" : items[i].children[1].textContent,
            "date" : items[i].children[2].textContent,
            "type" : items[i].children[3].textContent,
            "reason" : items[i].children[4].textContent,
            "result" : items[i].children[5].textContent
          });
        }

        // JSON 으로 처리하여 클라이언트에 응답
        res.send(JSON.stringify({
          "userinfo" : { // 사용자 정보
            "univtype" : document.querySelector("#lblDaehagNm").textContent,
            "depart" : document.querySelector("#lblHagbuNm").textContent,
            "major" : document.querySelector("#lblSosogNm").textContent,
            "course" : document.querySelector("#lblGwajeongNm").textContent,
            "id" : document.querySelector("#lblHagbeon").textContent,
            "name" : document.querySelector("#lblNm").textContent,
            "status" : document.querySelector("#lblHagjeogGbNm").textContent,
            "phone" : document.querySelector("#lblHdpNo").textContent
          },
          "apply_results" : history
        }));
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
module.exports = run;

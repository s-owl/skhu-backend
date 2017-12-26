const utils = require('../utils');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// 장학 신청 내역 조회
const run = (req, res, next) => {
  console.log("GET /scholarship/history");

  // 파일별 url 설정
  const url = `${utils.forestBaseUrl}/GATE/SAM/SCHOLARSHIP/S/SJHS01S.ASPX?&maincd=O&systemcd=S&seq=1`;
  utils.get(req, res, url, true)
    .then((rawData) => {
        const { document } = (new JSDOM(rawData)).window;
        // 장학 신청 내역 파싱
        let history = [];
        let items = document.querySelectorAll("table#dgList > tbody > tr");
        for(let i=0; i<items.length; i++){
          history.push({
            "year" : items[i].children[0].textContent,
            "semester" : items[i].children[1].textContent,
            "scholarship_name" : items[i].children[2].textContent,
            "order" : items[i].children[3].textContent,
            "grade" : items[i].children[4].textContent,
            "amount_entrance" : items[i].children[5].textContent,
            "amount_class" : items[i].children[6].textContent,
            "benefit_type" : items[i].children[7].textContent,
            "note" : items[i].children[8].textContent
          });
        }

        // JSON 으로 처리하여 클라이언트에 응답
        res.send(JSON.stringify({
          "scholarship_history" : history
        }));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = run;

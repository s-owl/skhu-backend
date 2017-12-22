const utils = require('../utils');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// 학사일정 조회
const run = (req, res, next) => {
  console.log("POST /life/schedules");
  const url = `${utils.skhuBaseUrl}/calendar/calendar_list_1.aspx?strYear=${req.body.year}&strMonth=${req.body.month}`;
  utils.get(req, res, url, true)
    .then((rawData)=>{
      const { document } = (new JSDOM(rawData)).window;
      // 학사 일정 파싱
      let calendar = [];
      let table = document.querySelectorAll("div.info > table > tbody > tr");
      for(let i=1; i<table.length; i++){
        let item = table[i].querySelectorAll("td");
        calendar.push({
          "period": item[0].textContent,
          "content": item[1].textContent
        });
      }
        // JSON 으로 처리하여 클라이언트에 응답
        res.send(JSON.stringify({
          "calendar": calendar
        }));
    })
    .catch((err)=>{
      console.log(err);
    });
}

module.exports = run;

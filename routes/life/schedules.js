// cURL 유틸
const curl_utils = require('../curl_utils');
const utils = require('../utils');
const Iconv = require('iconv').Iconv; // 인코딩 변환 모듈
const iconv = new Iconv('EUC-KR','UTF-8//TRANSLIT//IGNORE');
const jsdom = require('jsdom');
const request = require('request');

// 학사일정 조회
const run = (req, res, next) => {
  console.log("POST /life/schedules");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 학교 홈페이지에서 학사일정 파싱
  const url = utils.skhuBaseUrl + `/calendar/calendar_list_1.aspx?strYear=${req.body.year}&strMonth=${req.body.month}`;

  request({
      method: 'GET',
      url: utils.skhuBaseUrl + '/calendar/calendar_list_1.aspx?strYear=2017&strMonth=11',
      encoding: null,
      headers: {
        'User-Agent': utils.userAgentMacOSChrome
      }
    },
    (err, response, body) => {
      // 인코딩 변환
      let buffer = new Buffer(body, 'binary');
      let converted = iconv.convert(buffer).toString();
      jsdom.env( converted, ["http://code.jquery.com/jquery.js"], (err, window) => {
          if(err == undefined) {
            // 학사 일정 파싱
            const calendar = [];
            window.$("table:eq(1) > tbody > tr")
              .each((index, element) => {
                if (index > 1) {
                  calendar.push({
                    "period": window.$(element).children("td:eq(0)").text(),
                    "content": window.$(element).children("td:eq(1)").text()
                  });
                }
              });
              // JSON 으로 처리하여 클라이언트에 응답
              res.send(JSON.stringify({
                "calendar": calendar
              }));
          } else {
              console.log(err);
          }
      });
    });
}

module.exports = run;

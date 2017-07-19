// cURL 유틸
const curl_utils = require('../curl_utils');

// 상담 이력 조회
// POST - /life/consulting
const run = (req, res, next) => {
  console.log("POST /life/consulting");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "http://forest.skhu.ac.kr/Gate/InnerService/C/CS/A/ACSA07S.aspx?&maincd=O&systemcd=S&seq=99";

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window) => {
    let adviser = [];
    let history = [];

    window.$("#gvAssignTeacher > tbody > tr")
    .each( (index, element) => {
      if(index > 0){
        adviser.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "studentid" : window.$( element ).children("td:eq(2)").text(),
          "adviser" : window.$( element ).children("td:eq(3)").text(),
          "times" : window.$( element ).children("td:eq(4)").text()
        });
      }
    });

    window.$("#gvCounselingList > tbody > tr")
    .each( (index, element) => {
      if(index > 0){
        history.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "consultant" : window.$( element ).children("td:eq(2)").text(),
          "type" : window.$( element ).children("td:eq(3)").text(),
          "date" : window.$( element ).children("td:eq(4)").text()
        });
      }
    });

    // JSON 으로 가공하여 응답
    res.send({
      "adviser" : adviser,
      "history" : history
    });
  }).catch((err) => { console.log(err) });
}
module.exports = run;

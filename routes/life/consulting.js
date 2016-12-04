const utils = require('../utils');

// 상담 이력 조회
// POST - /life/consulting
const run = function(req, res, next){
  const url = utils.forestBaseUrl + '/Gate/InnerService/C/CS/A/ACSA07S.aspx?&maincd=O&systemcd=S&seq=99';
  utils.get(req, res, next, url, true)
  .then((window, rawData)=>{
    let adviser = [];
    let history = [];

    window.$("#gvAssignTeacher > tbody > tr")
    .each((index, element)=>{
      if(index>0){
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
    .each((index, element)=>{
      if(index>0){
        history.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "consultant" : window.$( element ).children("td:eq(2)").text(),
          "type" : window.$( element ).children("td:eq(3)").text(),
          "date" : window.$( element ).children("td:eq(4)").text()
        });
      }
    });
    res.send({
      "adviser" : adviser,
      "history" : history
    })
  });
}
module.exports = run;

var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /enroll/saved_credits");

  var url = utils.baseurl+"/Gate/SAM/Lecture/H/SSGH03S.aspx?&maincd=O&systemcd=S&seq=100";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var details = [];
    window.$("#gvDetails > tbody > tr")
    .each(function(index, element){
        details.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "used" : window.$( element ).children("td:eq(2)").text(),
          "available" : window.$( element ).children("td:eq(3)").text()
        });
    });

    var status_nav = "table.gridForm:eq(0) > tbody > tr:eq(1) >";
    res.send(JSON.stringify({
      "status" : {
        "accrued" : window.$(" > td:eq(0)").text().
        "accrued_criteria" : window.$(status_nav+"td:eq(1)").text(),
        "used" : window.$(status_nav+"td:eq(2)").text(),
        "used_criteria" : window.$(status_nav+"td:eq(3)").text().
        "available" : window.$(status_nav+"td:eq(4)").text()
      },
      "details" : details
    }));
  });
};
module.exports = run;

var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /enroll/saved_credits");

  var url = utils.baseurl+"/Gate/SAM/Lecture/H/SSGH03S.aspx?&maincd=O&systemcd=S&seq=100";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var details = [];
    window.$("#gvDetails > tbody > tr")
    .each(function(index, element){
      if(index > 0){
        details.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "used" : window.$( element ).children("td:eq(2)").text(),
          "available" : window.$( element ).children("td:eq(3)").text()
        });
      }
    });

    var status_nav = "#fvList > tbody > tr > td > table > tbody > tr >";
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
  });
};
module.exports = run;

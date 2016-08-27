var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /grade/certificate");

  var url = utils.baseurl+"/GATE/SAM/SCORE/S/SSJS06S.ASPX?&maincd=O&systemcd=S&seq=1";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var userinfo = [];
    var tmpName;
    window.$("#Table3 > tbody > tr > td")
    .each(function(index, element){
      console.log("index="+index);
      console.log(window.$( element ).text());
      if(index%2 == 0){
        tmpName = utils.trim(window.$( element ).text());
        console.log("TMPNAME="+tmpName);
      }else{
        userinfo.push({
          "name" : tmpName,
          "value" : utils.trim(window.$( element ).text())
        });
      }
    });

    var details = [];
    window.$("#dgList > tbody > tr")
    .each(function(index, element){
        details.push({
          "year" : window.$( element ).children("td:eq(0)").text(),
          "semester" : window.$( element ).children("td:eq(1)").text(),
          "code" : window.$( element ).children("td:eq(2)").text(),
          "subject" : window.$( element ).children("td:eq(3)").text(),
          "type" : window.$( element ).children("td:eq(4)").text(),
          "credit": window.$( element ).children("td:eq(5)").text(),
          "grade": window.$( element ).children("td:eq(6)").text()
        });
    });

    var summary = [];
    for(var i=0; i<17; i++){
      summary.push({
        "type" : window.$("#Table2 > tbody > tr:eq(0) > td:eq("+i+")").text(),
        "credit" : window.$("#Table2 > tbody > tr:eq(1) > td:eq("+i+")").text()
      })
    }

    res.send(JSON.stringify({
      "userinfo" : userinfo,
      "details" : details,
      "summary" : summary,
      "date" : window.$("#lblDt").text()
    }));
  });
};
module.exports = run;

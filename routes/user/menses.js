var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /user/menses");

  var url = utils.baseurl+"/GATE/SAM/LESSON/S/SSES03P.ASPX?&maincd=O&systemcd=S&seq=104";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var jsonMenses = [];
    window.$("#dgList > tbody > tr")
      .each(function(index, element){
           jsonMenses.push({
            "year" : window.$( element ).children("td:eq(0)").text(),
            "semester" : window.$( element ).children("td:eq(1)").text(),
            "code" : window.$( element ).children("td:eq(2)").text(),
            "name" : window.$( element ).children("td:eq(3)").text(),
            "class" : window.$( element ).children("td:eq(4)").text(),
            "professor" : window.$( element ).children("td:eq(5)").text(),
            "day" : window.$( element ).children("td:eq(6)").text()
          });
      });
    res.send(JSON.stringify({
      "menses" : jsonMenses
    }));
  });

}

module.exports = run;

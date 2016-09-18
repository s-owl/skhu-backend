var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /user/menses");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/GATE/SAM/LESSON/S/SSES03P.ASPX?&maincd=O&systemcd=S&seq=104";

  if(req.body.action=="fetch"){
    utils.get(req, res, next, url, true)
    .then(function(window, rawData){
      var history = [];
      window.$("#dgList1 > tbody > tr")
        .each(function(index, element){
            history.push({
              "year" : utils.trim(window.$( element ).children("td:eq(0)").text()),
              "semester" : utils.trim(window.$( element ).children("td:eq(1)").text()),
              "code" : utils.trim(window.$( element ).children("td:eq(2)").text()),
              "subject" : utils.trim(window.$( element ).children("td:eq(3)").text()),
              "class" : utils.trim(window.$( element ).children("td:eq(4)").text()),
              "professor" : utils.trim(window.$( element ).children("td:eq(5)").text()),
              "applied_at" : utils.trim(window.$( element ).children("td:eq(6)").text()),
              "absent_at" : utils.trim(window.$( element ).children("td:eq(7)").text()),
              "delete" : utils.trim(window.$( element ).children("td:eq(8)").text()),
            });
        });

      var available = [];
      window.$("#dgList > tbody > tr")
        .each(function(index, element){
            available.push({
              "year" : utils.trim(window.$( element ).children("td:eq(0)").text()),
              "semester" : utils.trim(window.$( element ).children("td:eq(1)").text()),
              "code" : utils.trim(window.$( element ).children("td:eq(2)").text()),
              "subject" : utils.trim(window.$( element ).children("td:eq(3)").text()),
              "class" : utils.trim(window.$( element ).children("td:eq(4)").text()),
              "professor" : utils.trim(window.$( element ).children("td:eq(5)").text()),
              "day" : utils.trim(window.$( element ).children("td:eq(6)").text()),
            });
        });

      res.send(JSON.stringify({
        "history" : history,
        "available" : available
      }));

    });
  }else if(req.body.action=="apply"){
    res.send("NOT IMPLEMENTED YET.");
  }
}

module.exports = run;

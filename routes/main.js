var utils = require('./utils');

var run = function(req, res, next){
  console.log("POST /main");

  var url = utils.baseurl+"/Gate/UniMainStudent.aspx";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
    // Parse credits data
    var jsonCredits = [];
    var creditsNav = "#upContents > #divContainer > div:eq(2) > table > tbody";
    for(var i=0; i<12; i+=2){
      for(var j=0; j<3; j++){
        jsonCredits.push({
          "type" : utils.trim(window.$(creditsNav + "> tr:eq("+i+") > td:eq("+j+")").text()),
          "earned" : utils.trim(window.$(creditsNav + "> tr:eq("+(i+1)+") > td:eq("+j+")").text())
        })
      }
    }

    // Parse attendance data
    var jsonAttendance = [];
    window.$("#upContents > #divContainer > div:eq(5) > div:eq(1) > table > tbody > tr")
      .each(function(index, element){
        if(index>=1){
          jsonAttendance.push({
            "subject" : utils.trim(window.$( element ).children("td:eq(0)").text()),
            "time" : utils.trim(window.$( element ).children("td:eq(1)").text()),
            "attend" : utils.trim(window.$( element ).children("td:eq(2)").text()),
            "late" : utils.trim(window.$( element ).children("td:eq(3)").text()),
            "absence" : utils.trim(window.$( element ).children("td:eq(4)").text()),
            "approved" : utils.trim(window.$( element ).children("td:eq(5)").text()),
            "menstrual" : utils.trim(window.$( element ).children("td:eq(6)").text()),
            "early" : utils.trim(window.$( element ).children("td:eq(7)").text())
          });
        }
      });

    res.send(JSON.stringify({
      "credits" : jsonCredits,
      "attendance" : jsonAttendance
    }));
  });

}

module.exports = run;

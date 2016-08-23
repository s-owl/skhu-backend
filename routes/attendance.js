var utils = require('./utils');

var run = function(req, res, next){
  console.log("POST /main");

  var url = utils.baseurl+"/Gate/UniMainStudent.aspx";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){


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
      "attendance" : jsonAttendance
    }));
  });

}

module.exports = run;

var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /page/calendar");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = "http://skhu.ac.kr/calendar/calendar_list_1.aspx?strYear="
    +req.body.year+"&strMonth="+req.body.month;

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
    var calendar = [];
    window.$("table:eq(1) > tbody > tr")
      .each(function(index, element){
        if(index>1){
          calendar.push({
            "period" : window.$( element ).children("td:eq(0)").text(),
            "content" : window.$( element ).children("td:eq(1)").text()
          });
        }
      });

    res.send(JSON.stringify({
      "calendar" : calendar
    }))
  });
}
module.exports = run;

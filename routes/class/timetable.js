var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /timetable");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/GATE/SAM/LESSON/A/SSEA34S.ASPX?&maincd=O&systemcd=S&seq=100";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
    // Parse some data
    var data = [[],[],[],[],[],[]];

    window.$("#tblTimeSheet > tbody > tr")
      .each(function(index, element){
        if(index>0){
          console.log("========================================");
          for(var i=0; i<6; i++){
            console.log(window.$( element ).children("td.TT_ItemCell:eq("+i+")").text());
            var item = window.$( element ).children("td.TT_ItemCell:eq("+i+")").text();
            if(item.length>0){
              var code_tutor = item.split("(")[1].split(")")[0];
              var codeval = code_tutor.split("-")[0] + "-" + code_tutor.split("-")[1];
              if(utils.isDuplicated(data[i], "code", codeval)==false){
                data[i].push({
                  "subject" : item.split("(")[0],
                  "code" : codeval,
                  "tutor" : code_tutor.split("-")[2],
                  "time" : item.split("(")[1].split(")")[1].substring(0,13),
                  "location" : item.split("(")[1].split(")")[1].substring(13,17)
                });
              }
            }
          }
        }
      });
    res.send(JSON.stringify({
        "monday" : data[0],
        "tuesday" : data[1],
        "wednsday" : data[2],
        "thursday" : data[3],
        "friday" : data[4],
        "saturday" : data[5]
    }));
  });

}

module.exports = run;

var utils = require('./utils');

var run = function(req, res, next){
  console.log("POST /main");

  var url = utils.baseurl+"/GATE/SAM/LESSON/A/SSEA34S.ASPX?&maincd=O&systemcd=S&seq=100";

  utils.get(req, res, next, url)
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
              data[i].push({
                "subject" : item.split("(")[0],
                "code-tutor" : item.split("(")[1].split(")")[0],
                "time" : item.split("(")[1].split(")")[1].substring(0,13),
                "location" : item.split("(")[1].split(")")[1].substring(13,17)
              });
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

var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /class/syllabus");

  var url = utils.baseurl+"/GATE/SAM/LESSON/S/SSES01S.ASPX?maincd=O&systemcd=S&seq=1";

  var formdata = [];
  formdata.push({"id" : "txtYy", "value" : req.body.data.txtYy});
  formdata.push({"id" : "ddlHaggi", "value" : req.body.data.ddlHaggi});
  formdata.push({"id" : "ddlSearch", "value" : req.body.data.ddlSearch});
  formdata.push({"id" : "txtSearch", "value" : req.body.data.txtSearch});

  var jsondata = {
    "cookie" : req.body.cookie,
    "form" : formdata,
    "btnid" : "CSMenuButton1_List"
  };

  utils.phFormTask(req, res, next, url, true, jsondata)
  .then(function(window, rawData){

    var gang = [];
    window.$("#dgList > tbody > tr")
      .each(function(index, element){
        if(index>=1){
          gang.push({
            "code" : window.$( element ).children("td:eq(0)").text(),
            "name" : window.$( element ).children("td:eq(1)").text(),
            "hagnun" : window.$( element ).children("td:eq(2)").text(),
            "haggi" : window.$( element ).children("td:eq(3)").text(),
            "bunban" : window.$( element ).children("td:eq(3)").text(),
            "isu" : window.$( element ).children("td:eq(3)").text(),
            "sosok" : window.$( element ).children("td:eq(3)").text(),
            "goysu" : window.$( element ).children("td:eq(3)").text(),
            "open" : window.$( element ).children("td:eq(3)").text(),
            "jaksung" : window.$( element ).children("td:eq(3)").text()
          });
        }
      });
    res.send(JSON.stringify({
      "asd": gang
    }));
  });

}

module.exports = run;

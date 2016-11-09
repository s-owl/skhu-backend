var jsdom = require('jsdom');
var run = function(req, res, next){
  console.log("POST /class/proTimetable");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  var cookie = {};
  for( var i = 0; i<req.body.cookie.length; i++){
    cookie[i] = req.body.cookie[i];
  }
  //console.log(cookie[0].domain);

  var objStaff = {};
  objStaff = req.body.objStaff;

  // Arguments
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_proTimetable.js'),
    req.body.year,
    req.body.semester,
    objStaff.txtStaffNO,
    objStaff.txtStaffName,
    objStaff.hidStaffNO,
    objStaff.hidJikjongCode,
    objStaff.hidJikgubCode,
    objStaff.hidDaehagCd,
    objStaff.hidHagbuCd,
    objStaff.hidSosogCd,
    objStaff.hidSocialNO,
     cookie[0].domain,
     cookie[0].httponly,
     cookie[0].name,
     cookie[0].path,
     cookie[0].secure,
     cookie[0].value,
     cookie[1].domain,
     cookie[1].httponly,
     cookie[1].name,
     cookie[1].path,
     cookie[1].secure,
     cookie[1].value,
     cookie[2].domain,
     cookie[2].httponly,
     cookie[2].name,
     cookie[2].path,
     cookie[2].secure,
     cookie[2].value,
     cookie[3].domain,
     cookie[3].httponly,
     cookie[3].name,
     cookie[3].path,
     cookie[3].secure,
     cookie[3].value
  ]
console.log(objStaff);
//console.log(cookie);
  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        if(err==undefined){
          var proTimetable = [];
          window.$("#tblTimeSheet > tbody > tr")
            .each(function(index, element){
              proTimatable.push({
                "item" : window.$( element ).children("td:eq(0)").text(),
                "item2" : window.$( element ).text(),
                "item3" : window.$( element ).children("td:eq(1)").text(),
                "item4" : window.$( element ).children("td:eq(2)").text(),
                "item5" : window.$( element ).children("td:eq(3)").text(),
                "item6" : window.$( element ).children("td:eq(4)").text(),
                "item7" : window.$( element ).children("td:eq(5)").text()
              });
            });
            res.send(JSON.stringify({
              "proTimetable" : proTimetable
            }));
        }
      });
    // pass cookies to the client
    // res.send(stdout);
  })
}

module.exports = run;

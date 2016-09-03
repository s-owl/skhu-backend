//var utils = require('../utils');
var jsdom = require('jsdom');

var run = function(req, res, next){
  console.log("POST /enroll/subjects");
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

  // console.log("professor = " + req.body.professor + " = finish");

  // Arguments
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_subjects.js'),
    req.body.year,
    req.body.semester,
    req.body.depart,
    req.body.professor,
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

  // var url = utils.baseurl+"/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1";
  // var formdata = []
  // formdata.push({"id" : "txtYy", "value" : req.body.data.year});
  // formdata.push({"id" : "ddlHaggi", "value" : utils.getSemesterCode(req.body.data.semester)});
  // formdata.push({"id" : "ddlSosog", "value" : getDepartCode(req.body.data.depart)});
  // formdata.push({"id" : "txtPermNm", "value" : req.body.data.professor});
  //
  // var jsondata = {
  //   "cookie" : req.body.cookie,
  //   "form" : formdata,
  //   "btnid" : "CSMenuButton1_List"
  // };
  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        if(err==undefined){
          var subjects = [];
          window.$("#dgList > tbody > tr")
            .each(function(index, element){
              subjects.push({
                "type" : window.$( element ).children("td:eq(0)").text(),
                "grade" : window.$( element ).children("td:eq(1)").text(),
                "code" : window.$( element ).children("td:eq(2)").text(),
                "class" : window.$( element ).children("td:eq(3)").text(),
                "subject" : window.$( element ).children("td:eq(4)").text(),
                "credits" : window.$( element ).children("td:eq(5)").text(),
                "tutor" : window.$( element ).children("td:eq(6)").text(),
                "grade_restriction" : window.$( element ).children("td:eq(7)").text(),
                "depart_restriction" : window.$( element ).children("td:eq(8)").text(),
                "time_location" : window.$( element ).children("td:eq(9)").text(),
                "note": window.$( element ).children("td:eq(10)").text(),
                "headcounts": window.$( element ).children("td:eq(11)").text()
              });
            });
            res.send(JSON.stringify({
              "subjects" : subjects
            }));
        }
      });
  })

  // utils.phFormTask(req, res, next, url, true, jsondata)
  // .then(function(window, rawData){
  //   // Parse subjects data
  //   var jsonSubjects = [];
  //   window.$("#dgList > tbody > tr")
  //     .each(function(index, element){
  //       if(index>=1){
  //         jsonSubjects.push({
  //           "type" : window.$( element ).children("td:eq(0)").text(),
  //           "grade" : window.$( element ).children("td:eq(1)").text(),
  //           "code" : window.$( element ).children("td:eq(2)").text(),
  //           "class" : window.$( element ).children("td:eq(3)").text(),
  //           "subject" : window.$( element ).children("td:eq(4)").text(),
  //           "credits" : window.$( element ).children("td:eq(5)").text(),
  //           "tutor" : window.$( element ).children("td:eq(6)").text(),
  //           "grade_restriction" : window.$( element ).children("td:eq(7)").text(),
  //           "depart_restriction" : window.$( element ).children("td:eq(8)").text(),
  //           "time_location" : window.$( element ).children("td:eq(9)").text(),
  //           "note": window.$( element ).children("td:eq(10)").text(),
  //           "headcounts": window.$( element ).children("td:eq(11)").text()
  //         });
  //       }
  //     });
  //   res.send(JSON.stringify({
  //     "subjects" : jsonSubjects
  //   }));
  // });

}

module.exports = run;

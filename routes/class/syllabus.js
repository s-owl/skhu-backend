var jsdom = require('jsdom');
var run = function(req, res, next){
  console.log("POST /class/syllabus");
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
  // Arguments
  var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(__dirname, 'ph_syllabus.js'),
    req.body.year,
    req.body.semester,
    req.body.type,
    req.body.keyword,
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

  // Execute Phantomjs script
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        if(err==undefined){
          var syllabus = [];
          window.$("#dgList > tbody > tr")
            .each(function(index, element){
              syllabus.push({
                "code" : window.$( element ).children("td:eq(0)").text(),
                "subject" : window.$( element ).children("td:eq(1)").text(),
                "grade" : window.$( element ).children("td:eq(2)").text(),
                "semester" : window.$( element ).children("td:eq(3)").text(),
                "class" : window.$( element ).children("td:eq(4)").text(),
                "type" : window.$( element ).children("td:eq(5)").text(),
                "depart" : window.$( element ).children("td:eq(6)").text(),
                "professor" : window.$( element ).children("td:eq(7)").text(),
                "isopened" : window.$( element ).children("td:eq(8)").text(),
                "url" : processIntoUrl(window.$( element ).children("td:eq(8)").html(),
                            window.$( element ).children("td:eq(8)").text()),
                "writted" : window.$( element ).children("td:eq(9)").text(),
              });
            });
            res.send(JSON.stringify({
              "syllabus" : syllabus
            }));
        }
      });
    // pass cookies to the client
    // res.send(stdout);
  })
}

function processIntoUrl(rawTag, isOpened){
  var utils = require('../utils');
  if(isOpened == "공개"){
      var rawstr = rawTag.split("&quot;");
      console.log(rawstr[1]);
      var data = rawstr[1].split("|");
      console.log(data);
      var url = utils.baseurl + "/Gate/SAM/Lesson/WEB/SSEW02O.aspx?Y=" + data[10] + "&HG=" + data[11] + "&GC=" + data[12]
            + "&DC=" + data[13] + "&HC=" + data[14] + "&SC=" + data[15]
    				+ "&HN=" + data[16] + "&BB=" + data[17] + "&SB=" +data[18];
            // +"&SBN="+ data[19];
      console.log(url);
      return url;
  }else{
    return "";
  }
}

module.exports = run;

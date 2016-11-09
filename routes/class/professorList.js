var jsdom = require('jsdom');
var run = function(req, res, next){
  console.log("POST /class/professorList");
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
    path.join(__dirname, 'ph_professorList.js'),
    req.body.rblSearch,
    req.body.search,
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
          var professorList = [];
          window.$("#dgList > tbody > tr")
            .each(function(index, element){
              professorList.push({
                // 담당교수조회 그대로 javascript포함된 a 태그를 반환함
                "code" : SelectCode(window.$( element ).children("td:eq(0)").html()),
                "name" : window.$( element ).children("td:eq(1)").text(),
                "occupations" : window.$( element ).children("td:eq(2)").text(),
                "rank" : window.$( element ).children("td:eq(3)").text(),
                "belong" : window.$( element ).children("td:eq(4)").text()
              });
            });
            res.send(JSON.stringify({
              "professorList" : professorList
            }));
        }
      });
  })
}

function SelectCode(rawTag){
  var utils = require('../utils');

  var rawstr = rawTag.split("&quot;");

  var query = '<a href="javascript:SelectCode("'+rawstr[1]+'","'+rawstr[3]+'","'+rawstr[5]+'","'+rawstr[7]+'","'+rawstr[9]+'","'+rawstr[11]+'","'+rawstr[13]+'","'+rawstr[15]+'","'+rawstr[17]+'","'+rawstr[19]+'")">'+rawstr[3]+'</a>';
  console.log(query);
  return query;
};


module.exports = run;

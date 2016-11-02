var utils = require('../utils');

// 이수학점 조회
var run = function(req, res, next){
  console.log("POST /user/credits");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.forestBaseUrl+"/Gate/UniMainStudent.aspx";

  // GET 요청 및 파싱 준비
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

    // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "credits" : jsonCredits
    }));
  });

}

module.exports = run;

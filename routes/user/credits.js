// 팬텀 유틸
var ph_utils = require('../ph_utils');
var utils = require('../utils');

// 이수 학점 조회
var run = function(req, res, next) {
  console.log("POST /user/credits");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  var url = ph_utils.baseurl+"/Gate/UniMainStudent.aspx";

  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {
      var jsonCredits = [];
      var creditsNav = "#upContents > #divContainer > div:eq(2) > table > tbody";
      for(var i = 0; i < 12; i += 2){
        for(var j = 0; j < 3; j++){
          jsonCredits.push({
            "type" : utils.trim(window.$(`${creditsNav} > tr:eq(${i}) > td:eq(${j})`).text()),
            "earned" : utils.trim(window.$(`${creditsNav} > tr:eq(${i+1}) > td:eq(${j})`).text())
          })
        }
      }

      res.send(JSON.stringify({
        "credits" : jsonCredits
      }));

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
};

module.exports = run;

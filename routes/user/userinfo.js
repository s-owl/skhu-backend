// 팬텀 유틸
var ph_utils = require('../ph_utils');

// 학생 정보를 보여주는 라우팅
// 메소드 : POST | 경로 : /user/userinfo
var run = function(req, res, next){
  console.log("POST /user/userinfo");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  var url = ph_utils.baseurl+"/Gate/UniTopMenu.aspx";

  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {
      var rawData = window.$("#lblInfo").text();
      // ":" 을 기준으로 쪼갬
      var splited = rawData.split(":");
      // 쪼갠것의 1 번째 요소를 "(" 로 쪼개서 배열로 저장
      var userinfo = splited[1].split("(");
      var name = userinfo[0]; // userinfo 의 0번째 원소 - 이름
      var id = userinfo[1].split(")")[0]; // userinfo 의 1번째 원소 - 학번

      // JSON 으로 가공하여 응답
      res.send(JSON.stringify({
        "userinfo" : {
          "name" : name,
          "id" : id
        }
      }));

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
}

module.exports = run;
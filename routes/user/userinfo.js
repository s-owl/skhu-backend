// 학생 정보를 보여주는 라우팅
// 메소드 : POST | 경로 : /user/userinfo

var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /user/userinfo");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/Gate/UniTopMenu.aspx";

  // GET 요청 작업 수행 및, html parser 준비된 객체 받기
  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
      // html parsing 작업
      // #lblInfo 에 해당하는 태그의 텍스트 추출
      var raw = window.$("#lblInfo").text();
      console.log(raw);
      // ":" 을 기준으로 쪼갬
      var splited = raw.split(":");
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
  });
}
module.exports = run;

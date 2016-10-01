var run = function(req, res, next){
  console.log("POST /user/logout");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var utils = require('../utils');
  var url = utils.baseurl + "/Gate/LogOut.aspx";
  // 로그아웃 요청 보내기 - 파싱 안함
  utils.get(req, res, next, url, false)
  .then(function(rawData){
    console.log("==================================");
    console.log(rawData);
    console.log("==================================");
    // "안전하게 로그아웃 되었습니다!" 가 있으면, 로그아웃 성공 처리
    if(rawData.includes("안전하게 로그아웃 되었습니다!")){
      res.send("LOGGED OUT!");
    }else{
      res.send("ERROR!")
    }
  });
}

module.exports = run;

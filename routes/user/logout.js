// cURL 유틸
const curl_utils = require('../curl_utils');

const run = (req, res, next) => {
  console.log("POST /user/logout");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  const url = "http://forest.skhu.ac.kr/Gate/LogOut.aspx";

  // 파일별 콜백 함수
  // const callbackFunc = (err, window) => {
  //   if(err == undefined) {
  //
  //   } else {
  //     console.log(err, stdout, stderr);
  //   }
  // };

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window)=>{
    if(window.includes("안전하게 로그아웃 되었습니다!")){
      res.send("LOGGED OUT!");
    } else {
      res.send("ERROR!")
    }
  }).catch((err)=>{console.log(err)});
}

module.exports = run;

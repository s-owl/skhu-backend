// cURL 유틸
const curl_utils = require('../curl_utils');

// 학생 정보를 보여주는 라우팅
// 메소드 : POST | 경로 : /user/userinfo
const run = (req, res, next) => {
  console.log("POST /user/userinfo");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "http://forest.skhu.ac.kr/Gate/UniTopMenu.aspx";

  // 파일별 콜백 함수
  // const callbackFunc = (err, window) => {
  //   if(err == undefined) {
  //
  //
  //   } else {
  //     console.log(err, stdout, stderr);
  //   }
  // };

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window)=>{
    const rawData = window.$("#lblInfo").text();
    // ":" 을 기준으로 쪼갬
    const splited = rawData.split(":");
    // 쪼갠것의 1 번째 요소를 "(" 로 쪼개서 배열로 저장
    let userinfo = splited[1].split("(");
    const name = userinfo[0]; // userinfo 의 0번째 원소 - 이름
    const id = userinfo[1].split(")")[0]; // userinfo 의 1번째 원소 - 학번

    // JSON 으로 가공하여 응답
    res.send(JSON.stringify({
      "userinfo" : {
        "name" : name,
        "id" : id
      }
    }));
  }).catch((err)=>{console.log(err)});
}

module.exports = run;

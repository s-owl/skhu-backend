// cURL 유틸
const curl_utils = require('../curl_utils');
const utils = require('../utils');

// 이수 학점 조회
const run = function(req, res, next) {
  console.log("POST /user/credits");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  const url = "http://forest.skhu.ac.kr/Gate/UniMainStudent.aspx";

  // 파일별 콜백 함수
  // const callbackFunc = (err, window) => {
  //   if(err == undefined) {
  //     const jsonCredits = [];
  //     const creditsNav = "#upContents > #divContainer > div:eq(2) > table > tbody";
  //     for(let i = 0; i < 12; i += 2){
  //       for(let j = 0; j < 3; j++){
  //         jsonCredits.push({
  //           "type" : utils.trim(window.$(`${creditsNav} > tr:eq(${i}) > td:eq(${j})`).text()),
  //           "earned" : utils.trim(window.$(`${creditsNav} > tr:eq(${i+1}) > td:eq(${j})`).text())
  //         })
  //       }
  //     }
  //
  //     res.send(JSON.stringify({
  //       "credits" : jsonCredits
  //     }));
  //
  //   } else {
  //     console.log(err, stdout, stderr);
  //   }
  // };

  // cURL.get() 호출
  curl_utils.get(req, res, url).then((window)=>{
    const jsonCredits = [];
    const creditsNav = "#upContents > #divContainer > div:eq(2) > table > tbody";
    for(let i = 0; i < 12; i += 2){
      for(let j = 0; j < 3; j++){
        jsonCredits.push({
          "type" : utils.trim(window.$(`${creditsNav} > tr:eq(${i}) > td:eq(${j})`).text()),
          "earned" : utils.trim(window.$(`${creditsNav} > tr:eq(${i+1}) > td:eq(${j})`).text())
        })
      }
    }

    res.send(JSON.stringify({
      "credits" : jsonCredits
    }));
  }).catch((err)=>{console.log(err);});
};

module.exports = run;

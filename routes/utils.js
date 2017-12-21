// 베이스 URL
exports.forestBaseUrl = "http://forest.skhu.ac.kr";
exports.skhuBaseUrl = "http://skhu.ac.kr";
exports.userAgentMacOSChrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";

// 문자열에서 불필요한 요소를 제거하는 함수
let trim = function(raw){
  return raw.toString().replace(/[\n\t\r]/g,"").replace(/  /g,'');
}
exports.trim = trim;

/*
  req : Express 요청 객체
  res : Express 응답 객체
  url : 요청을 위한 Url
  isEucKr : Url 로 요청을 보내면 받는 응답의 인코딩. EUC-KR 라면 true, UTF-8 이라면 false
*/
let get = function(req, res, url, isEucKr, doParse){
  // Promise 를 반환함.
  return new Promise((resolve, reject) => {

    let jsdom = require('jsdom'); // html parser
    let Iconv = require('iconv').Iconv; // 인코딩 변환 모듈
    let iconv = new Iconv('EUC-KR','UTF-8//TRANSLIT//IGNORE'); // 인코딩 변환 모듈
    const request = require('request');// http client 모듈

    let reqHeaders = {'User-Agent': utils.userAgentMacOSChrome};
    if(req.get("token") != undefined && req.get("token") != null){
      headers.Cookie = req.get("token");
    }
    let reqEncoding = isEucKr ? null : "UTF-8";
    request({
        method: 'GET',
        url: url,
        encoding: reqEncoding,
        headers: reqHeaders
      },
      (err, response, body) => {
        if(err != undefined && err != null) reject(err);
        let content = body;
        if(isEucKr){
          let buffer = new Buffer(body, 'binary');
          content = iconv.convert(buffer).toString();
        }
        if(doParse){
          // doParse 가 true 인 경우, html parser 를 준비
          jsdom.env( content, ["http://code.jquery.com/jquery.js"],
            function (err, window) {
              if(err==undefined){
                // 오류가 없는 경우, html parser 를 준비.
                // Promise 작업 성공 처리
                resolve(content, window);
              }else{
                // 오류
                // Promise 작업 실패 처리
                reject(err);
              }
            });
        }else{
          // doParse 가 false 인 경우
          // html parser 준비 없이 Promise 작업 성공 처리
          resolve(content, null);
        }
      });
    });
}
exports.get = get;


let isDuplicated = function(array, key, value){
  for(let i=0; i<array.length; i++){
    if(key==""){
      if(array[i]==value){
        return true;
      }
    }else{
      if(eval('array[i].'+key)==value){
        return true;
      }
    }
  }
  return false;
}
exports.isDuplicated = isDuplicated;

// 학기 코드 변환 함수
let getSemesterCode = function(semester){
  switch(semester){
    case "first":
      return "Z0101";
    case "second":
      return "Z0102";
    case "summer":
      return "Z0103";
    case "summer":
      return "Z0104";
    default:
      return "Z0101";
  }
}
exports.getSemesterCode = getSemesterCode;

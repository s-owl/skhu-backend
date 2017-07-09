// 베이스 URL
exports.forestBaseUrl = "http://forest.skhu.ac.kr";
exports.skhuBaseUrl = "http://skhu.ac.kr";

// 문자열에서 불필요한 요소를 제거하는 함수
var trim = function(raw){
  return raw.toString().replace(/[\n\t\r]/g,"").replace(/  /g,'');
}
exports.trim = trim;

var get = function(req, res, next, url, doParse){

  // Promise 를 반환함.
  return new Promise(function(resolve, reject) {
    // http client 모듈
    var unirest = require('unirest');
    var cookiejar = unirest.jar();
    var jsdom = require('jsdom'); // html parser
    var Iconv = require('iconv').Iconv; // 인코딩 변환 모듈
    var iconv = new Iconv('EUC-KR','UTF-8//TRANSLIT//IGNORE');

    try{

      //요청에서 쿠키값 가져오기
      var uni_value = req.body.cookie[1].value;
      var auth_value = req.body.cookie[2].value;

      // 쿠키를 Cookie Jar 에 추가
      cookiejar.add('.AuthCookie='+auth_value, url);
      cookiejar.add('UniCookie='+uni_value, url);
    }catch(err){
      console.log(err);
    }

    // forest 에 GET 요청 보내기
    unirest.get(url)
    .encoding('binary') // 인코딩 : binary
    .headers({
      'Content-Type': 'application/json',
      'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
        })
    .jar(cookiejar) // 미리 준비한 쿠키와 함꼐 요청 보내기
    .end(function (response) {
      // 응답 처리
      console.log("=====GOT RESPONSSE=====");
      console.log(response.headers);
      console.log(response.body);
      // Iconv 를 이용하여, EUC-KR　에서 UTF-8 로 변환
      var buffer = new Buffer(response.body, 'binary');
      var converted = iconv.convert(buffer).toString();
      console.log(converted);
      if(doParse){
        // doParse 가 true 인 경우, html parser 를 준비
        jsdom.env( converted, ["http://code.jquery.com/jquery.js"],
          function (err, window) {
            if(err==undefined){
              // 오류가 없는 경우, html parser 를 준비.
              // Promise 작업 성공 처리
              resolve(window, converted);
            }else{
              // 오류
              // Promise 작업 실패 처리
              reject(err);
            }
          });
      }else{
        // doParse 가 false 인 경우
        // html parser 준비 없이 Promise 작업 성공 처리
        resolve(converted);
      }
    });
  });
}
exports.get = get;


var isDuplicated = function(array, key, value){
  for(var i=0; i<array.length; i++){
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
var getSemesterCode = function(semester){
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

// ===== 작동하지 않음. 사용하려면, 작업이 더 필요함 =====
// Phantom.js 를 이용하여, html form 에 데이터를 넣고 제출하는 작업을 일반화 한 함수
// req : Express 요청 객체, res : Express 응답 객체, next : Express 의 next 객체
// url : html form 이 있는 페이지 주소, resurl : 폼 제출 후 나오는 페이지의 url
// formid : form 의 id 값, btnid : 제출 버튼 id, formids : input 의 id값 배열
// formvals ; input 에 넣을 값 배열, doParse : html parser 준비 여부
var phFormTask = function(req, res, next, url, resurl, formid, btnid, formids, formvals, doParse){

    // Promise 를 반환
    return new Promise(function(resolve, reject) {

    var jsdom = require('jsdom');
    console.log("==========phFormTask==========");
    var path = require('path');
    var childProcess = require('child_process');
    var phantomjs = require('phantomjs-prebuilt');
    var binPath = phantomjs.path;

    // Arguments
    var childArgs = [];
    childArgs.push('--ignore-ssl-errors=yes');
    childArgs.push(path.join(__dirname, 'ph_form.js'));
    childArgs.push(url);
    childArgs.push(resurl);
    childArgs.push(formid);
    childArgs.push(btnid);
    // Add form id and form values to childArgs
    childArgs.push(formids.length);
    for(var i=0; i<formids.length; i++){
      childArgs.push(formids[i]);
      childArgs.push(formvals[i]);
    }

    // Add cookie to childArgs
    for(var i=0; i<req.body.cookie.length; i++){
      childArgs.push(req.body.cookie[i].domain);
      childArgs.push(req.body.cookie[i].httponly);
      childArgs.push(req.body.cookie[i].name);
      childArgs.push(req.body.cookie[i].path);
      childArgs.push(req.body.cookie[i].secure);
      childArgs.push(req.body.cookie[i].value);
    }
    console.log(childArgs);
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      console.log(err, stdout, stderr);
      console.log("=====doParse : "+doParse+"=====");
      console.log("ERROR(err) : "+err);
      console.log("ERROR(stderr) : "+stderr);

      resolve(stdout);
      // // reject(err, stderr);
      // if(doParse==true){
      //   console.log("=====Preparing JSDOM=====");
      //   jsdom.env( stdout.toString(), ["http://code.jquery.com/jquery.js"],
      //     function (jsdomerr, window) {
      //       if(jsdomerr==undefined){
      //         // We can now parse some data from html page
      //         console.log("==========Now passing data to promise==========");
      //         console.log(stdout.toString());
      //         resolve([window, stdout.toString()]);
      //       }else{
      //         console.log("==========ERROR!==========");
      //         console.log(jsdomerr);
      //         // Error!
      //         reject(jsdomerr);
      //       }
      //     });
      // }else{
      //   console.log("=====doParse : "+doParse+" =====");
      //   resolve(stdout);
      // }
    });
  });
}
exports.phFormTask = phFormTask;

// 메소드 : GET | 요청 경로 : /
// 간단히 서버 정보를 보여주는 라우팅

var run = function(req, res, next){

  // 서버 정보
  var info = "Foressst API Server <br> \
    Based on Node.js and Express.js <br> \
    Developed by :<br> \
    Youngbin Han (201632034 | sukso96100@gmail.com) from Sungkonghoe University - Software Engineering <br> \
    Geonwoo Chu (201534028 | cnrjsdn@gmail.com) from Sungkonghoe University - Software Engineering <br> \
    Daseul Bae (201232016 | dghdu@naver.com) from Sungkonghoe University - Software Engineering <br><br> \
    Foressst API 서버 <br> \
    Node.js 및 Express.js 기반으로 개발됨 <br> \
    개발자 : <br> \
    한영빈 (201632034 | sukso96100@gmail.com) 성공회대학교 소프트웨어공학과 <br> \
    추건우 (201534028 | cnrjsdn@gmail.com) 성공회대학교 소프트웨어공학과 <br> \
    배다슬 (201232016 | dghdu@naver.com) 성공회대학교 소프트웨어공학과";

  // 서버 정보를 요청에 대한 응답으로 전송
  res.send(info);
}

  // run 함수를 다른 모듈에서 사용 가능하도록 노출
  module.exports = run;

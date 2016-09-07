var run = function(req, res, next){
  var info = "Foressst API Server <br> \
    Based on Node.js and Express.js <br> \
    Developed by :<br> \
    Youngbin Han (201632034 | sukso96100@gmail.com) from Sungkonghoe University - Software Engineering <br> \
    Geonwoo Chu (201534028 | cnrjsdn@gmail.com)  from Sungkonghoe University - Software Engineering <br><br> \
    Foressst API 서버 <br> \
    Node.js 및 Express.js 기반으로 개발됨 <br> \
    개발자 : <br> \
    한영빈 (201632034 | sukso96100@gmail.com) 성공회대학교 소프트웨어공학과 <br> \
    추건우 (201534028 | cnrjsdn@gmail.com) 성공회대학교 소프트웨어공학과";
  res.send(info);
}
  module.exports = run;

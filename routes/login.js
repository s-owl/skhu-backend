var request = require('request');

var run = function(req, res, next){
  var url = "https://forest.skhu.ac.kr/Gate/UniLogin.aspx";

  // 요청의 body 에서 Id, Pw 값 얻기
  var Id = req.body.studentid;
  var Pw = req.body.studentpw;

  var formData = {
    txtId: Id,
    txtPw: Pw
  };
  var headers = {

  };
  var options = {"rejectUnauthorized": false, "url": url, "method": "POST", "headers": headers};
  request(options, function (error, response, body) {
    // console.log(error);
    console.log(response);
      var setcookie = response.headers["set-cookie"];
      if ( setcookie ) {
        setcookie.forEach(
          function ( cookiestr ) {
            console.log( "COOKIE:" + cookiestr );
          }
        );
      }
    // console.log(body);
      //Get Cookies from "response", then pass them to "res"
      res.send("Logged In!");
   });
}

module.exports = run;

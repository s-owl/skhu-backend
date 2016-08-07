var request = require('request');
var cheerio = require('cheerio');

var testJs = function(req, res){
  var headers = req.headers;
  var body = req.body;
//  console.log(headers);
  //console.log(body);
//  console.log(res.header('set-cookie'));
/*
GET / 304 15.642 ms - -
{ host: 'localhost:3000',
  connection: 'keep-alive',
  'content-length': '2434',
  'cache-control': 'max-age=0',
  origin: 'http://localhost:3000',
  referer: 'http://localhost:3000/',
  'accept-encoding': 'gzip, deflate',
  'accept-language': 'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4' }
*/

//  console.log(headers);


  var options = {
    "rejectUnauthorized": false,
    "url": "https://forest.skhu.ac.kr/Gate/UniLogin.aspx",
    "method": "POST",
    "headers": headers,
    "formdata": body
  };

  request(options, function(error, response, html){
       function getUnicodeToString(unicodes) {

        unicodes = unicodes || [];

        var ret = [];

        for (var i = 0, length = unicodes.length; i < length; i++) {
            ret.push(unescape(unicodes[i]));
        }

        return ret.join('');
    }
  //  console.log(response);
    //var setcookie = response.headers["set-cookie"];

      if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        res.send($.html());
        console.log(getUnicodeToString(html));
        console.log("success");
      } else {
        console.log(error);
        res.send(error);
      }
      /*
    if ( setcookie ) {
      setcookie.forEach(
        function ( cookiestr ) {
          console.log( "COOKIE:" + cookiestr );
        }
      );
    } else {
      console.log("no cookie");
    }
    */
  })
}

module.exports = testJs;

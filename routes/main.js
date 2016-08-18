var utils = require('./utils');
var unirest = require('unirest');
var cookiejar = unirest.jar();
var jsdom = require('jsdom');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR','UTF-8//TRANSLIT//IGNORE');

var run = function(req, res, next){
  console.log("POST /main");

  var url = "http://forest.skhu.ac.kr/Gate/UniMainStudent.aspx";
  var uni_value = req.body.cookie[1].value;
  var auth_value = req.body.cookie[2].value;

  // Add Cookies to the Cookie Jar
  cookiejar.add('.AuthCookie='+auth_value, url);
  cookiejar.add('UniCookie='+uni_value, url);

  unirest.post(url)
  .encoding('binary')
  .headers({
    'Content-Type': 'application/json',
    'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
  })
  .jar(cookiejar)
  .end(function (response) {
    console.log("-----------------------------------------------------------");
    console.log(JSON.stringify(response.body));
    console.log("-----------------------------------------------------------");
    var buffer = new Buffer(response.body, 'binary');
    var converted = iconv.convert(buffer).toString();
    console.log(converted);
    parseData(res, converted);
  });

}

function parseData(res, rawData){
  jsdom.env( rawData, ["http://code.jquery.com/jquery.js"],
    function (err, window) {

      var jsonCredits = [];
      var creditsNav = "#upContents > #divContainer > div:eq(2) > table > tbody"
      for(var i = 0; i < 12; i+=2){
        for(var j = 0; j < 3; j++){
          jsonCredits.push({
            "type" : utils.trim(window.$(creditsNav + "> tr:eq("+i+") > td:eq("+j+")").text()),
            "earned" : utils.trim(window.$(creditsNav + "> tr:eq("+(i+1)+") > td:eq("+j+")").text())
          })
        }
      }

      var jsonAttendance = [];
      window.$("#upContents > #divContainer > div:eq(5) > div:eq(1) > table > tbody > tr")
            .each(function(index, element){
              if(index>=2 && window.$( element ).children("td").length>=2){
                jsonAttendance.push({
                  "subject" : utils.trim(window.$( element ).children("td:eq(0)").text()),
                  "time" : utils.trim(window.$( element ).children("td:eq(1)").text()),
                  "attend" : utils.trim(window.$( element ).children("td:eq(2)").text()),
                  "late" : utils.trim(window.$( element ).children("td:eq(3)").text()),
                  "absence" : utils.trim(window.$( element ).children("td:eq(4)").text()),
                  "approved" : utils.trim(window.$( element ).children("td:eq(5)").text()),
                  "menstrual" : utils.trim(window.$( element ).children("td:eq(6)").text()),
                  "early" : utils.trim(window.$( element ).children("td:eq(7)").text())
                });
              }
            });

      res.send(JSON.stringify({
        "credits" : jsonCredits,
        "attendance" : jsonAttendance
      }));

    });
}

module.exports = run;

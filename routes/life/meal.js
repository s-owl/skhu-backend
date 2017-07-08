// 팬텀 유틸
var ph_utils = require('../ph_utils');
var utils = require('../utils');

// Show Meal URLs
var getUrls = function(req, res, next){
  console.log("GET /life/meal/urls");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  var url = ph_utils.skhuBaseUrl+"/uni_zelkova/uni_zelkova_4_3_list.aspx";

  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {
      var urls = [];
      window.$("table.board_list > tbody > tr")
        .each(function(index, element){
          console.log(window.$( element ).children("td:eq(1)").html());
          var rawtag = window.$( element ).children("td:eq(1)").html();
          var splited = rawtag.split('href="')[1];
          var itemurl = ph_utils.skhuBaseUrl + "/uni_zelkova/" + splited.split('">')[0];
          var finalurl = itemurl.replace("&amp;","&");
          urls.push({
            "title" : window.$( element ).children("td:eq(1)").text(),
            "url" :  finalurl,
            "date" : window.$( element ).children("td:eq(3)").text()
          })
        });

      res.send(JSON.stringify({
        "urls" : urls
      }));

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
};

exports.getUrls = getUrls;

// Show Meal Data
var getData = function(req, res, next){
  console.log("POST /life/meal/data");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // Parse Meal Data from the url
  // 파일별 url 설정
  var defaultUrl = ph_utils.skhuBaseUrl+"/uni_zelkova/uni_zelkova_4_3_first.aspx";
  var url = req.body.url == undefined || req.body.url == "" ? defaultUrl : req.body.url;

  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {

      // Process into JSON
      var meal = [];
      var nav = "table.cont_c"
      for(var i=0; i<5; i++){
        meal.push({
          "date" : window.$(nav+" > thead > tr:eq(1) > th:eq("+(i+2)+")").text(),
          "day" : window.$(nav+" > thead > tr:eq(0) > th:eq("+(i+1)+")").text(),
          "lunch" : {
            "a" : {
              "diet" : window.$(nav+" > tbody > tr:eq(0) > td:eq("+i+")").text(),
              "calorie" : window.$(nav+" > tbody > tr:eq(1) > td:eq("+i+")").text()
            },
            "b" : {
              "diet" : window.$(nav+" > tbody > tr:eq(2) > td:eq("+i+")").text(),
              "calorie" : window.$(nav+" > tbody > tr:eq(3) > td:eq("+i+")").text()
            },
            "c" : {
              "diet" : window.$(nav+" > tbody > tr:eq(4) > td:eq("+i+")").text(),
              "calorie" : window.$(nav+" > tbody > tr:eq(5) > td:eq("+i+")").text()
            }
          },
          "dinner" : {
            "a" : {
              "diet" : window.$(nav+" > tbody > tr:eq(6) > td:eq("+i+")").text(),
              "calorie" : window.$(nav+" > tbody > tr:eq(7) > td:eq("+i+")").text()
            }
          }
        });
      }

      // JSON 으로 처리하여 클라이언트에 응답
      res.send(JSON.stringify({
        "data" : meal
      }));

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
}

exports.getData = getData;

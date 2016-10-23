var utils = require('../utils');
var defaultUrl = "http://skhu.ac.kr/uni_zelkova/uni_zelkova_4_3_first.aspx";
// Show Meal URLs
var getUrls = function(req, res, next){
  console.log("GET /life/meal/urls");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var urls = [];
    window.$("table.board_list > tbody > tr")
      .each(function(index, element){
        urls.push({
          "title" : window.$( element ).children("td:eq(1) > span > a").text(),
          "url" : utils.skhuBaseUrl + window.$( element ).children("td:eq(1) > span > a").attr('href'),
          "date" : window.$( element ).children("td:eq(3)").text(),
        })
      });

    res.send(JSON.stringify({
      "urls" : urls
    }));
});
exports.getUrls = getUrls;

// Show Meal Data
var getData = function(req, res, next){
  console.log("POST /life/meal/data");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // Parse Meal Data from the url
  var defaultUrl = "http://skhu.ac.kr/uni_zelkova/uni_zelkova_4_3_first.aspx";
  var url = req.body.url == undefined || req.body.url == "" ? defaultUrl : req.body.url;

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

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
            "calorie" : window.$(nav+" > tbody > tr:eq(1) > td:eq("+i+")").text(),
          },
          "b" : {
            "diet" : window.$(nav+" > tbody > tr:eq(2) > td:eq("+i+")").text(),
            "calorie" : window.$(nav+" > tbody > tr:eq(3) > td:eq("+i+")").text(),
          },
          "c" : {
            "diet" : window.$(nav+" > tbody > tr:eq(4) > td:eq("+i+")").text(),
            "calorie" : window.$(nav+" > tbody > tr:eq(5) > td:eq("+i+")").text(),
          }
        },
        "dinner" : {
          "a" : {
            "diet" : window.$(nav+" > tbody > tr:eq(6) > td:eq("+i+")").text(),
            "calorie" : window.$(nav+" > tbody > tr:eq(7) > td:eq("+i+")").text(),
          }
        }
      });
    }

      // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "data" : meal
    }))
  });
}
module.getData = getData;

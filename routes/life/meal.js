var utils = require('../utils');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// Show Meal URLs
var getUrls = function(req, res, next){
  console.log("GET /life/meal/urls");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);
  var url = utils.skhuBaseUrl + "/uni_zelkova/uni_zelkova_4_3_list.aspx";
  utils.get(req, res, url, true)
    .then((rawData)=>{
      const { document } = (new JSDOM(rawData)).window;
      let urls = [];
      let rawList = document.querySelectorAll("table.board_list > tbody > tr");
      for(let i=0; i<rawList.length; i++){
        let tds = rawList[i].querySelectorAll("td");
        urls.push({
          "title" : tds[1].querySelector('a').text,
          "url" :  utils.skhuBaseUrl + "/uni_zelkova/" + tds[1].querySelector('a').href,
          "date" : tds[3].text
        });
    }
    res.send(JSON.stringify({
      "urls" : urls
    }));
  })
  .catch((err)=>{});
};
exports.getUrls = getUrls;

// Show Meal Data
var getData = function(req, res, next){
  console.log("POST /life/meal/data");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // Parse Meal Data from the url
  var defaultUrl = utils.skhuBaseUrl + "/uni_zelkova/uni_zelkova_4_3_first.aspx";
  var url = req.body.url == undefined || req.body.url == "" ? defaultUrl : req.body.url;

  utils.get(req, res, url, true)
  .then((rawData)=>{
    const { document } = (new JSDOM(rawData)).window;
    // Process into JSON
    let meal = [];
    let table = document.querySelector("table.cont_c");
    for(var i=0; i<5; i++){
      meal.push({
        "day" : table.querySelector(`thead > tr:nth-child(1) > th:nth-child(${i+2})`).textContent,
        "date" : table.querySelector(`thead > tr:nth-child(2) > th:nth-child(${i+3})`).textContent,
        "lunch" : {
          "a" : {
            "diet" : table.querySelector(`tbody > tr:nth-child(1) > td:nth-child(${i+3})`).innerHTML.replace(/<br>/gi, "\n"),
            "calorie" : table.querySelector(`tbody > tr:nth-child(2) > td:nth-child(${i+3})`).textContent
          },
          "b" : {
            "diet" : table.querySelector(`tbody > tr:nth-child(3) > td:nth-child(${i+3})`).innerHTML.replace(/<br>/gi, "\n"),
            "calorie" : table.querySelector(`tbody > tr:nth-child(4) > td:nth-child(${i+3})`).textContent
          },
          "c" : {
            "diet" : table.querySelector(`tbody > tr:nth-child(5) > td:nth-child(${i+3})`).innerHTML.replace(/<br>/gi, "\n"),
            "calorie" : table.querySelector(`tbody > tr:nth-child(6) > td:nth-child(${i+3})`).textContent
          }
        },
        "dinner" : {
          "a" : {
            "diet" : table.querySelector(`tbody > tr:nth-child(7) > td:nth-child(${i+3})`).innerHTML.replace(/<br>/gi, "\n"),
            "calorie" : table.querySelector(`tbody > tr:nth-child(8) > td:nth-child(${i+3})`).textContent
          }
        }
      });
    }

      // JSON 으로 처리하여 클라이언트에 응답
    res.send(JSON.stringify({
      "data" : meal
    }))
  });
};
exports.getData = getData;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const utils = require('../utils');

// 이수 학점 조회
const run = function(req, res, next) {
  console.log("GET /user/credits");

  // 파일별 url 설정
  const url = `${utils.forestBaseUrl}/Gate/UniMainStudent.aspx`;
  utils.get(req, res, url, true)
    .then((rawData) => {
      const { document } = (new JSDOM(rawData)).window;
      let jsonCredits = [];
      const elementNav = "div#divContainer > div:nth-of-type(3) > table > tbody > tr";
      const items = document.querySelectorAll(elementNav);
      for(let i = 0; i < 12; i += 2){
        for(let j = 0; j < 3; j++){
          jsonCredits.push({
            "type" : utils.trim(items[i].children[j].textContent),
            "earned" : utils.trim(items[i+1].children[j].textContent)
          });
        }
      }

      res.send(JSON.stringify({
        "credits" : jsonCredits
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = run;

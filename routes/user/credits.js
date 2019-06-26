const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const utils = require("../utils");

// 이수 학점 조회
const run = function(req, res, next) {
	console.log("GET /user/credits");

	// 파일별 url 설정
	const url = `${utils.forestBaseUrl}/Gate/UniMainStudent.aspx`;
	utils.get(req, res, url, true)
		.then((rawData) => {
			const { document } = (new JSDOM(rawData)).window;
			const jsonCredits = [];
			const elementNav = "#divContainer > div:nth-child(4) > table > tbody > tr";
			const items = document.querySelectorAll(elementNav);
			for(let i = 0; i < 14; i += 2){
				for(let j = 0; j < 3; j++){
					if (i == 10 && j != 0) {
						break;
					}
					jsonCredits.push({
						"type" : utils.trim(items[i].children[j].textContent),
						"earned" : utils.trim(items[i+1].children[j].textContent)
					});
				}
			}

			const summary = document.querySelector("span#CORX03C1_lblTot").innerHTML;

			res.json({
				"credits" : jsonCredits,
				"summary": summary
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = run;

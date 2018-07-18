const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const utils = require("../utils");

// 학생 정보를 보여주는 라우팅
// 메소드 : GET | 경로 : /user/userinfo
const run = (req, res, next) => {
	console.log("GET /user/userinfo");

	// 파일별 url 설정
	const url = `${utils.forestBaseUrl}/Gate/UniTopMenu.aspx`;

	utils.get(req, res, url, true)
		.then((rawData) => {
			const { document } = (new JSDOM(rawData)).window;
			const rawTxt = document.querySelector("span#lblInfo").textContent;
			// ":" 을 기준으로 쪼갬
			const splited = rawTxt.split(":");
			// 쪼갠것의 1 번째 요소를 "(" 로 쪼개서 배열로 저장
			const userinfo = splited[1].split("(");
			const name = userinfo[0]; // userinfo 의 0번째 원소 - 이름
			const id = userinfo[1].split(")")[0]; // userinfo 의 1번째 원소 - 학번

			// JSON 으로 가공하여 응답
			res.send(JSON.stringify({
				"userinfo" : {
					"name" : name,
					"id" : id
				}
			}));
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = run;

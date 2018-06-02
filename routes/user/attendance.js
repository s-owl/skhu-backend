// cURL 유틸
const utils = require("../utils");
const {JSDOM} = require("jsdom");
// 출결현황 조회
const run = (req, res, next) => {
	console.log("POST /user/attendance");
	console.log("REMOTE IP : " + req.ip);
	console.log("REMOTE IPS : " + req.ips);

	// 파일별 url 설정
	const url = "http://forest.skhu.ac.kr/Gate/UniMainStudent.aspx";

	// cURL.get() 호출
	utils.get(req, res, url, true).then((rawData) => {
		const { document } = (new JSDOM(rawData)).window;
		const jsonAttendance = [];
		const elementNav = "#gvList > tbody > tr";
		const items = document.querySelectorAll(elementNav);

		for(let i=1; i<items.length; i++){
			jsonAttendance.push({
				"subject" : utils.trim(items[i].children[0].textContent),
				"time" : utils.trim(items[i].children[1].textContent),
				"attend" : utils.trim(items[i].children[2].textContent),
				"late" : utils.trim(items[i].children[3].textContent),
				"absence" : utils.trim(items[i].children[4].textContent),
				"approved" : utils.trim(items[i].children[5].textContent),
				"menstrual" : utils.trim(items[i].children[6].textContent),
				"early" : utils.trim(items[i].children[7].textContent)
			});
		}

		// JSON 으로 처리하여 클라이언트에 응답
		res.json({
			"attendance" : jsonAttendance
		});

	}).catch((err) => {
		console.log(err);
	});
};

module.exports = run;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const utils = require("../utils");

// 교내 제출용 성적증명서 조회
const run = (req, res, next) => {

	//log 알림
	console.log("POST /grade/certificate");

	// 파일별 url 설정
	const url = `${utils.forestBaseUrl}/GATE/SAM/SCORE/S/SSJS06S.ASPX?&maincd=O&systemcd=S&seq=1`;

	utils.get(req, res, url, true)
		.then((rawData) => {
			const { document } = (new JSDOM(rawData)).window;

			let title, userinfo = [];
			//querySelectorAll -> 특정 css 열 가져오기
			const rawInfo = document.querySelectorAll("#Table3 > tbody > tr > td");
			for(let i=0; i<rawInfo.length; i++){
				//크롤링 규칙
				if(i%2==0){
					//짝수 규칙에 title
					title = rawInfo[i].textContent;
				}else{
					//크롤링 홀수 유저 정보
					userinfo.push({
						"name" : utils.trim(title),
						"value" : utils.trim(rawInfo[i].textContent)
					});
				}
			}

			const details = [];
			const gradeInfo = document.querySelector("table#dgList > tbody").children;
			//학생정보 set

			for(let i=0; i<gradeInfo.length; i++){
				details.push({
					"year" : gradeInfo[i].children[0].textContent,
					"semester" : gradeInfo[i].children[1].textContent,
					"code" : gradeInfo[i].children[2].textContent,
					"subject" : gradeInfo[i].children[3].textContent,
					"type" : gradeInfo[i].children[4].textContent,
					"credit": gradeInfo[i].children[5].textContent,
					"grade": gradeInfo[i].children[6].textContent
				});
			}


			const summary = [];
			const summaryTable = document.querySelector("table#Table2 > tbody");
			for(let i = 0; i < 17; i++){
				summary.push({
					"type" :  summaryTable.children[0].children[i].textContent,
					"credit" : summaryTable.children[1].children[i].textContent
				});
			}
	//성적  set

			res.send(JSON.stringify({
				"userinfo" : userinfo,
				"details" : details,
				"summary" : summary,
				"date" : document.querySelector("#lblDt").textContent
			}));
			//요약
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = run;

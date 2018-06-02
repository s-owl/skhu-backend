const utils = require("../utils");

// 생리공결 조회 및 신청
const run = function(req, res, next){
	console.log("POST /user/menses");
	console.log("REMOTE IP : " + req.ip);
	console.log("REMOTE IPS : " + req.ips);

	const url = utils.forestBaseUrl+"/GATE/SAM/LESSON/S/SSES03P.ASPX?&maincd=O&systemcd=S&seq=104";

	if(req.body.action=="fetch"){
		// action 값이 fetch 인 경우, 생리공결 현황을 조회함
		utils.get(req, res, next, url, true)
			.then((window, rawData) => {

				// 생리공결 기록 파싱해오기
				// #dgList1 에 해당하는 태그 안의 테이블에 있음
				const history = [];
				window.$("#dgList1 > tbody > tr")
					.each((index, element) => {
						history.push({
							"year" : utils.trim(window.$( element ).children("td:eq(0)").text()),
							"semester" : utils.trim(window.$( element ).children("td:eq(1)").text()),
							"code" : utils.trim(window.$( element ).children("td:eq(2)").text()),
							"subject" : utils.trim(window.$( element ).children("td:eq(3)").text()),
							"class" : utils.trim(window.$( element ).children("td:eq(4)").text()),
							"professor" : utils.trim(window.$( element ).children("td:eq(5)").text()),
							"applied_at" : utils.trim(window.$( element ).children("td:eq(6)").text()),
							"absent_at" : utils.trim(window.$( element ).children("td:eq(7)").text()),
							"delete" : utils.trim(window.$( element ).children("td:eq(8)").text()),
						});
					});

				// 생리공결 신청 가능한 강의 조회
				// #dgList 에 해당하는 태그 안의 테이블에 있음
				const available = [];
				window.$("#dgList > tbody > tr")
					.each((index, element) => {
						available.push({
							"year" : utils.trim(window.$( element ).children("td:eq(0)").text()),
							"semester" : utils.trim(window.$( element ).children("td:eq(1)").text()),
							"code" : utils.trim(window.$( element ).children("td:eq(2)").text()),
							"subject" : utils.trim(window.$( element ).children("td:eq(3)").text()),
							"class" : utils.trim(window.$( element ).children("td:eq(4)").text()),
							"professor" : utils.trim(window.$( element ).children("td:eq(5)").text()),
							"day" : utils.trim(window.$( element ).children("td:eq(6)").text()),
						});
					});

				// JSON 으로 처리하여 클라이언트에 응답
				res.send(JSON.stringify({
					"history" : history,
					"available" : available
				}));

			});
	}else if(req.body.action=="apply"){
		// action 값이 apply 인 경우, 모두 신청 처리.
		// ===== 아직 구현되지 않음. =====
		res.send("NOT IMPLEMENTED YET.");
	}
};

module.exports = run;

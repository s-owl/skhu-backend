const utils = require("../utils");
const pconn = require("../puppeteer_connection");
const {JSDOM} = require("jsdom");
const url = `${utils.forestBaseUrl}/Gate/UniMainStudent.aspx`;
// 출결현황 조회
module.exports = {
	get: (req, res, next) => {
		console.log("GET /user/attendance");

		// cURL.get() 호출
		utils.get(req, res, url, true).then((rawData) => {
			const { document } = (new JSDOM(rawData)).window;
			const jsonAttendance = [];
			const elementNav = "#gvList > tbody > tr";
			const items = document.querySelectorAll(elementNav);
			for(let i=1; i<items.length; i++){
				const subjectStr = utils.trim(items[i].children[0].textContent);
				const splitedSubjArr = subjectStr.split("(");
				jsonAttendance.push({
					"subject_code" : splitedSubjArr[1].replace(")",""),
					"subject" : splitedSubjArr[0],
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
	},
	post: async(req, res, next) => {
		const credential = req.get("Credential"); // Request의 Header 에서 Credential 값 로드
		const browser = await pconn.getConnection();
		const context = await browser.createIncognitoBrowserContext();
		const page = await context.netPage(); // 페이지 생성
		await page.setJavaScriptEnabled(true); // Puppeteer 페이지에서 JS 활성화
		await page.setUserAgent(utils.userAgentIE); // User Agent 를 IE 로 설정

		// 문저열로 된 Credential 값을 쪼개서 JSON 객체 배열로 변환
		const credentialArray = pconn.credentialStringToCookieArray(credential);
		await page.goto(url); // 페이지 이동 - 빈 페이지에서는 쿠키 설정 불가
		await page.setCookie(...credentialArray); // 객체 배열로 변환한 Credential 을 페이지 쿠키로 설정

		// 특정 HTTP 요청 감시/차단
		pconn.setAbortCoreSecurityJs(page);
		
		await page.goto(url); // 이동

		await page.select("#ddlHaggi", req.body.semester);
		await page.click("#btnList");

		setTimeout(async() => {
			const items = await page.$$("#gvList > tbody > tr");
			const list = [];
			// 요소 배열 순회하면서 JSON 객채로 변환하여 새 배열에 삽입
			for(let i=1; i<items.length; i++){
				const data = [];
				for(let j=1; j<=8; j++){
				//각 행의 열 데이터를 뽑아 임시배열에 저장
					data.push(await items[i].$eval(`td:nth-child(${j})`, (node) => node.textContent));
				}
				// 임시배열에서 꺼내 최종 배열에 저장.
				const subjectStr = utils.trim(data[0]);
				const splitedSubjArr = subjectStr.split("(");
				list.push({
					"subject_code" : splitedSubjArr[1].replace(")",""),
					"subject" : splitedSubjArr[0],
					"time" : data[1],
					"attend" : data[2],
					"late" : data[3],
					"absence" : data[4],
					"approved" : data[5],
					"menstrual" : data[6],
					"early" : data[7]
				});
			}
			await context.close();
			res.json({
				"attendance" : list
			});
			return;
		}, 1000);
		
		
	}
};


const puppeteer = require("puppeteer"); //라이브러리
const utils = require("../utils");
const putils = require("../putils");
// /enroll/subjects
const run = async(req, res, next)=>{
	// URL 빌드
	const url = `${utils.forestBaseUrl}/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1`;

	const credential = req.get("Credential"); // Request의 Header 에서 Credential 값 로드
	const browser = await putils.initBrowser(); // Puppeteer 초기화
	const page = await browser.newPage(); // 페이지 생성
	await page.setJavaScriptEnabled(true); // Puppeteer 페이지에서 JS 활성화
	await page.setUserAgent(utils.userAgentIE); // User Agent 를 IE 로 설정

	// 문저열로 된 Credential 값을 쪼개서 JSON 객체 배열로 변환
	const credentialArray = putils.credentialStringToCookieArray(credential);
	await page.goto(url); // 페이지 이동 - 빈 페이지에서는 쿠키 설정 불가
	await page.setCookie(...credentialArray); // 객체 배열로 변환한 Credential 을 페이지 쿠키로 설정

	// 특정 HTTP 요청 감시/차단
	putils.setAbortCoreSecurityJs(page);
	await page.goto(url); // 이동
	console.log(await page.url());
	let waitFor = 0;
	//강의 계획서
	if(req.method=="POST"){
		waitFor = 1000;
		if(req.body.year) await page.type("#txtYy", req.body.year);
		if(req.body.semester) await page.select("#ddlHaggi", req.body.semester);
		if(req.body.major) await page.select("#ddlSosog", req.body.major);
		if(req.body.professor) await page.type("#txtPermNm", req.body.professor);
		//리스트 선택 박스

		//과목 클릭
		await page.click("#CSMenuButton1_List");
	}

	setTimeout(async()=>{
		// 테이블 접근하여 각 행(가로방향으로 한 줄) 추출하여 배열로 생성
		const items = await page.$$("#dgList > tbody > tr");
		const list = [];
		// 요소 배열 순회하면서 JSON 객채로 변환하여 새 배열에 삽입
		for(const item of items){
			const data = [];

			//강의 계획서 상세
			for(let i=1; i<=12; i++){
				//각 행의 열 데이터를 뽑아 임시배열에 저장
				data.push(await item.$eval(`td:nth-of-type(${i})`, (node) => node.textContent));
			}
			// 임시배열에서 꺼내 최종 배열에 저장. 교과목 개요
			list.push({
				"type": data[0],
				"grade": data[1],
				"code": data[2],
				"class": data[3],
				"subject": data[4],
				"score": data[5],
				"professor": data[6],
				"grade_limit": data[7],
				"major_limit": data[8],
				"time": data[9],
				"note": data[10],
				"available": data[11]
			});
		}
		// 학기 선택지 가져오기 , 원하는 학기 선택 박스
		const semesterOptions = await page.$$eval("#ddlHaggi > option",
			(node) => {
				console.log(node);
				const arr = [];
				for(const item of node){
					console.log(item);
					arr.push({"title": item.innerHTML, "value": item.value});
				}
				return arr;
			});

			//전공 소속 선택 박스
		const majorOptions = await page.$$eval("#ddlSosog > option",
			(node) => {
				console.log(node);
				const arr = [];
				for(const item of node){
					//리스트 출력
					console.log(item);

					//리스트 선택
					arr.push({"title": item.innerHTML, "value": item.value});
				}
				return arr;
			});

			//교수 이름
		const majorCurrent = await page.$eval("#ddlSosog", opt => {
			//작성한
			return { "title": opt.options[opt.selectedIndex].innerHTML, "value": opt.value };
		});

		await browser.close();
		// 처리된 데이터로 클라이언트의 요청에 응답
		res.json({
			"list": list,
			"options":{
				"semester": semesterOptions,
				"major": majorOptions,
				"major_current": majorCurrent
			}
		});
	}, waitFor);
};
//학과 / 학부 강의계획서 검색 및 저장 처리 class
module.exports= run;

const utils = require("../utils");
const jsdom = require("jsdom");
const puppeteer = require("puppeteer");

// 학사일정 조회
const run = async (req, res, next) => {
	console.log("POST /life/schedules");
	const url = `${utils.skhuBaseUrl}/calendar/calendar_list_1.aspx?strYear=${req.body.year}&strMonth=${req.body.month}`;
	try{
		const browser = await puppeteer.launch(); // Puppeteer 초기화
		const page = await browser.newPage(); // 페이지 생성
		await page.setJavaScriptEnabled(true);
		await page.goto(url);
		const nav = "div#cont > div.coll_schedule > div.top > div.calendar > div.info > table > tbody > tr";
		const items = await page.$$eval(nav, (nodes)=>{
			const datas = [];
			for(let i=1; i<nodes.length; i++){
				datas.push({
					"period": nodes[i].children[0].textContent,
					"content": nodes[i].children[1].textContent
				});
			}
			return datas;
		});
		await browser.close();
		res.json({
			"schedules": items
		});
	}catch(err){
		console.error(err);
		res.sendStatus(500);
	}
};

module.exports = run;

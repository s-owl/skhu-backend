// 메소드 : GET | 요청 경로 : /
// 간단히 서버 상태를 검사하고 메세지를 출력하는 라우팅

const run = async function(req, res, next){
	// puppeteer 의 작동 여부 검사
	const pconn = require("./puppeteer_connection");
	try {
		browser = await pconn.openConnection();
		context = await browser.createIncognitoBrowserContext();
		context.close();
		browser.close();
	} catch (e) {
		res.status(500).send("PUPPETEER ERROR");
		console.log(e);
		return;
	}

	// 요청에 대한 응답으로 전송
	res.send("OK");
};

// run 함수를 다른 모듈에서 사용 가능하도록 노출
module.exports = run;

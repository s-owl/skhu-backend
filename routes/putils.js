module.exports = {
	credentialStringToCookieArray: (credentialStr)=>{
		const credentialArray = [];
		const credentialItems=credentialStr.split(";");
		for(const item of credentialItems){
			// String str += item.split("")
			//정규식 /=(.+)/ .포함되어 있는 거
			const splited=item.split(/=(.+)/);
			const obj = {

				"name":String(splited[0]).trim(),
				"value":String(splited[1]).trim(),
				"domain":"forest.skhu.ac.kr"};

			//null
			if(splited[0] != "" && splited[1] != undefined){
				credentialArray.push(obj);
			}
		}
		return credentialArray;
	},

	//async(page) promise대기  async - > await (async 사용을 중단)
	setAbortCoreSecurityJs: async(page)=>{
		await page.setRequestInterception(true);
		page.on("request", interceptedRequest => {
			// 요청 URL 이 CoreSecurity.js 로 끝나면
			if (interceptedRequest.url().endsWith("CoreSecurity.js")){
				interceptedRequest.abort(); // 요청 탈취하야 취소 처리
			}else{
				interceptedRequest.continue(); // 그 외에는 그대로 진행
			}
		});
	},

	initBrowser: ()=>{
		const puppeteer = require("puppeteer");
		if(process.env.PUPPETEER_REMOTE_URL != undefined ||
			process.env.PUPPETEER_REMOTE_URL != null){
			return puppeteer.connect({ignoreHTTPSErrors: true, browserWSEndpoint: process.env.PUPPETEER_REMOTE_URL});
		}else{
			return puppeteer.launch({ignoreHTTPSErrors: true});
		}
	}
};

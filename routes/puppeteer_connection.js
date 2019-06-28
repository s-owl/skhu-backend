module.exports = {
	connection: null,
	getContext: async ()=>{
		if(this.connection == null){
			if(process.env.PUPPETEER_REMOTE_URL != undefined || 
				process.env.PUPPETEER_REMOTE_URL != null){
				await this.openConnection();
				this.connection.on("disconnected", async () => {
					console.log("DISCONNECT");
					await this.openConnection();
				});
			}else{
				const puppeteer = require("puppeteer");
				this.connection = await puppeteer.launch({ignoreHTTPSErrors: true});
			}
		}
		try {
			return await this.connection.createIncognitoBrowserContext();
		} catch(e) {
			console.log("CLOSE");
			await this.openConnection();
			return await this.connection.createIncognitoBrowserContext();
		}
	},
	credentialStringToCookieArray: (credentialStr)=>{
		const credentialArray = [];
		const credentialItems=credentialStr.split(";");
		for(const item of credentialItems){
			const splited=item.split(/=(.+)/);
			const obj = {
				"name":String(splited[0]).trim(),
				"value":String(splited[1]).trim(),
				"domain":"forest.skhu.ac.kr"};
			if(splited[0] != "" && splited[1] != undefined){
				credentialArray.push(obj);
			}
		}
		return credentialArray;
	},
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
	setCloseContextTimer: (context)=>{
		setTimeout(async()=>{
			await context.close();
		}, 300000);
	}
};

exports.openConnection = async()=>{
	const puppeteer = require("puppeteer-core");
	const connection = await puppeteer.connect({ignoreHTTPSErrors: true,
		browserWSEndpoint: process.env.PUPPETEER_REMOTE_URL});
	this.connection = connection;
};


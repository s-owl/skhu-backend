const puppeteer = require("puppeteer");
const utils = require("../utils");
const putils = require("../putils");
// 로그인 작업을 수행
const run = async (req, res, next) => {
	console.log("POST /user/login");

	// Page urls
	const logInPageUrl = `${utils.forestBaseUrl}/Gate/UniLogin.aspx`;
	const mainPageUrl = `${utils.forestBaseUrl}/Gate/UniMyMain.aspx`;
	const newLogInPageUrl = "http://cas.skhu.ac.kr";
	const newLogInAuthUrl0 = `${utils.samBaseUrl}/Auth/LoginSSO`;
	const newLogInAuthUrl1 = `${utils.samBaseUrl}/Auth/LoginSSO_ConsumeResponse`;

	const ID = req.body.userid, PW = req.body.userpw;
	let tried = false;

	let credentialOld = "";
	let credentialNew = "";
	let credentialNewToken = "";

	// Prepare headless chrome browser
	// const browser = await puppeteer.launch({ignoreHTTPSErrors: true, args: ["--no-sandbox", "--disable-dev-shm-usage"]});
	const browser = await putils.initBrowser();
	const page = await browser.newPage();
	await page.setJavaScriptEnabled(true);
	await page.setUserAgent(utils.userAgentIE);
	if(ID == undefined || ID == "" || PW == undefined || PW == "" || PW.length < 8){
		res.seatus(400).end(`
		ID or PW is empty. Or PW is shorter then 8 digits.
		학번 또는 비밀번호가 비어있거나 비밀번호가 8자리 미만 입니다.`);
		await browser.close();
		return;
	}
	await page.setCacheEnabled(false);
	// Listen for page fully loaded event
	page.on("load", async() => {
		console.log(page.url());
		if(page.url() == logInPageUrl){
			if(tried){
				// If page is still login page, then it's failed.
				console.log("Stil same page!");
				res.status(401).end(`
				Login Failed
				(Can't log in to forest.skhu.ac.kr, Check ID and PW again)
				로그인 실패
				(forest.skhu.ac.kr 에 로그인 할 수 없습니다. 학번과 비밀번호를 다시 확인하세요.)`);
				await browser.close();
			}else{
				// 2. Put ID and PW then log in.
				console.log("forest.skhu.ac.kr - logging in");
				(async ()=>{
					await page.type("#txtID", ID);
					await page.type("#txtPW", PW);
					(await page.$("#txtPW")).press("Enter");
					tried = true;
					page.on("dialog", async dialog => {
						await dialog.dismiss();
					});
				})();
			}
		}else if(page.url() == mainPageUrl){
			// 5. Logged in.(forest.skhu.ac.kr)
			(async ()=>{
				try{
					// 6. Get cookie from the page
					const cookieObj = await page.cookies();
					for(const i in cookieObj){
						credentialOld += `${cookieObj[i].name}=${cookieObj[i].value}; `;
					}
					console.log("forest.skhu.ac.kr - logged in");
					console.log("navigating to sam.skhu.ac.kr");
					// 7. Open sam.skhu.ac.kr that redirects to cas.skhu.ac.kr(login page for sam.skhu.ac.kr)
					await page.goto(utils.samBaseUrl);

				}catch(e){
					console.log(e);
				}
			})();
		}else if(page.url().startsWith(newLogInPageUrl)){
			(async ()=>{
				try{
					//
					page.waitForSelector("body.ng-scope.modal-open")
						.then(async() => {
							// If a modal is shown, then login task is failed.
							res.status(401).end(`
							Login Failed
							(Logged in to forest.skhu.ac.kr. But can't log in to sam.skhu.ac.kr
							Please contact to Sunkonghoe University Electronic Computing Center)
							로그인 실페
							(forest.skhu.ac.kr 에 로그인 했으나, sam.skhu.ac.kr에 로그인 할 수 없습니다.
							성공회대학교 전자계산소에 문의해 주세요.)`);
							await browser.close();
						});
					console.log("cas.skhu.ac.kr - logging in");
					await page.type("#login-username", ID);
					await page.type("#login-password", PW);
					(await page.$("#login-password")).press("Enter");
				}catch(e){
					console.log(e);
				}
			})();
		}else if(page.url().startsWith(utils.samBaseUrl)){
			//10. Logged In.(sam.skhu.ac.kr)
			(async ()=>{
				const cookieObj = await page.cookies();
				for(const i in cookieObj){
					credentialNew += `${cookieObj[i].name}=${cookieObj[i].value}; `;
				}
				//11. Get RequestVerificationToken
				console.log("sam.skhu.ac.kr - logged in");
				credentialNewToken = await page.evaluate(() => {
					return document.body.getAttribute("ncg-request-verification-token");
				});
				await browser.close();
				// 12. send it to client
				res.json({
					"credential-old": credentialOld,
					"credential-new": credentialNew,
					"credential-new-token": credentialNewToken
				});
			})();
		}
	});

	try{
		// 1. Open Log In Page(forest.skhu.ac.kr)
		await page.goto(logInPageUrl);
	} catch(e){
		console.log(e);
	}
};

module.exports = run;

const utils = require("../utils");
const pconn = require("../puppeteer_connection");
// 로그인 작업을 수행
const run = async (req, res, next) => {
	console.log("POST /user/login");

	// Page urls
	const logInPageUrl = `${utils.forestBaseUrl}/Gate/UniLogin.aspx`;
	const agreementPageUrl = `${utils.forestBaseUrl}/Gate/CORE/P/CORP02P.aspx`;
	const mainPageUrl = `${utils.forestBaseUrl}/Gate/UniMyMain.aspx`;
	const newLogInPageUrl = "http://cas.skhu.ac.kr";
	// const newLogInAuthUrl0 = `${utils.samBaseUrl}/Auth/LoginSSO`;
	// const newLogInAuthUrl1 = `${utils.samBaseUrl}/Auth/LoginSSO_ConsumeResponse`;

	const ID = req.body.userid, PW = req.body.userpw;

	const context = await pconn.getContext(); 

	if(ID == undefined || ID == "" || PW == undefined || PW == "" || PW.length < 8){
		await context.close();
		res.status(400).end(
			"ID or PW is empty. Or PW is shorter then 8 digits.\n"
		+	"If your using password with less then 8 digits, please change it at forest.skhu.ac.kr\n"
		+	"학번 또는 비밀번호가 비어있거나 비밀번호가 8자리 미만 입니다.\n"
		+	"8자리 미만 비밀번호 사용 시, forest.skhu.ac.kr 에서 변경 후 사용해 주세요.");
		return;
	}

	const outputData = {
		error: {
			status: 0,
			message: ""
		},
		credentialOld: "",
		credentialNew: "",
		credentialNewToken: ""
	};

	const outputProxy = new Proxy(outputData, {
		set: async (target, property, value, receiver)=>{
			target[property] = value;
			console.log(property);
			console.log(target);
			console.log(receiver);
			if(property == "error" && value != undefined){
				await context.close();
				res.status(value.status).end(value.message);
			}else if(["credentialOld", "credentialNew", "credentialNewToken"]
				.includes(property) && target.credentialOld && 
				target.credentialNew && target.credentialNewToken){
				await context.close();
				res.json({
					"credential-old": target.credentialOld,
					"credential-new": target.credentialNew,
					"credential-new-token": target.credentialNewToken
				});
			}
			return true;
		}
	});

	const forestPage = await context.newPage();
	await forestPage.setJavaScriptEnabled(true);
	await forestPage.setUserAgent(utils.userAgentIE);
	await forestPage.setCacheEnabled(false);
	let tried = false;
	forestPage.on("load", async () => {
		console.log(forestPage.url());
		if(forestPage.url() == logInPageUrl){
			if(tried){
				outputProxy.error = {
					status: 401,
					message: 
						"Login Failed\n"
					+	"(Can't log in to forest.skhu.ac.kr, Check ID and PW again)\n\n"
					+	"로그인 실패\n"
					+	"(forest.skhu.ac.kr 에 로그인 할 수 없습니다. 학번과 비밀번호를 다시 확인하세요.)"
				};
				console.log("forest.ac.kr - login failed.");
				return;
			}else{
				// 2. Put ID and PW then log in.
				console.log("forest.skhu.ac.kr - logging in");
				(async ()=>{
					console.log(forestPage.url());
					await forestPage.type("#txtID", ID);
					await forestPage.type("#txtPW", PW);
					(await forestPage.$("#txtPW")).press("Enter");
					tried = true;
					forestPage.on("dialog", async dialog => {
						await dialog.dismiss();
					});
				})();
			}
		}else if(forestPage.url() == agreementPageUrl){
			outputProxy.error = {
				status: 401,
				message: 
					"Please complete the privacy policy agreement on forest.skhu.ac.kr\n"
					+ "forest.skhu.ac.kr 에서 개인정보 제공 동의를 먼저 완료해 주세요."
			};
			return;
		}else if(forestPage.url() == mainPageUrl){
			// 5. Logged in.(forest.skhu.ac.kr)
			(async ()=>{
				try{
					// 6. Get cookie from the page
					const cookieObj = await forestPage.cookies();
					let credentialOld = "";
					for(const i in cookieObj){
						credentialOld += `${cookieObj[i].name}=${cookieObj[i].value}; `;
					}
					outputProxy.credentialOld = credentialOld;
					console.log("forest.skhu.ac.kr - logged in");

				}catch(e){
					console.log(e);
				}
			})();
		}
	});
	await forestPage.goto(logInPageUrl);

	const samPage = await context.newPage();
	await samPage.setJavaScriptEnabled(true);
	await samPage.setUserAgent(utils.userAgentIE);
	await samPage.setCacheEnabled(false);
	// Listen for page fully loaded event
	samPage.on("load", async() => {
		console.log(samPage.url());
		if(samPage.url().startsWith(newLogInPageUrl)){
			(async ()=>{
				try{
					//
					samPage.waitForSelector("body.ng-scope.modal-open")
						.then(async() => {
							// If a modal is shown, then login task is failed.
							outputProxy.error = {
								status: 401,
								message:
									"Login Failed\n"
								+	"(Logged in to forest.skhu.ac.kr. But can't log in to sam.skhu.ac.kr\n"
								+	"Please contact to Sunkonghoe University Electronic Computing Center)\n\n"
								+	"로그인 실페\n"
								+	"(forest.skhu.ac.kr 에 로그인 했으나, sam.skhu.ac.kr에 로그인 할 수 없습니다.\n"
								+	"성공회대학교 전자계산소에 문의해 주세요.)"
							};
							return;
						});
					console.log("cas.skhu.ac.kr - logging in");
					await samPage.type("#login-username", ID);
					await samPage.type("#login-password", PW);
					(await samPage.$("#login-password")).press("Enter");
				}catch(e){
					console.log(e);
				}
			})();
		}else if(samPage.url().startsWith(utils.samBaseUrl)){
			//10. Logged In.(sam.skhu.ac.kr)
			(async ()=>{
				let credentialNew = "", credentialNewToken = "";
				const cookieObj = await samPage.cookies();
				for(const i in cookieObj){
					credentialNew += `${cookieObj[i].name}=${cookieObj[i].value}; `;
				}
				//11. Get RequestVerificationToken
				console.log("sam.skhu.ac.kr - logged in");
				credentialNewToken = await samPage.evaluate(() => {
					return document.body.getAttribute("ncg-request-verification-token");
				});
				outputProxy.credentialNew = credentialNew;
				outputProxy.credentialNewToken = credentialNewToken;
				return;
			})();
		}
	});
	await samPage.goto(utils.samBaseUrl);

	pconn.setCloseContextTimer(context);
};

module.exports = run;

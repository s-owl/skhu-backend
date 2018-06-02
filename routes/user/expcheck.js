const utils = require("../utils");
// 쿠키 만료 여부 확인 작업을 수행함

const run = function(req, res, next){
	console.log("POST /user/expcheck");
	console.log("REMOTE IP : " + req.ip);
	console.log("REMOTE IPS : " + req.ips);

	const url = utils.forestBaseUrl+"/Gate/UniTopMenu.aspx";

	const unirest = require("unirest");
	const cookiejar = unirest.jar(); // 쿠키를 담을 Cookie Jar 준비

	try{
		// 요청 바디에서 쿠키값 로드
		const uni_value = req.body.cookie[1].value;
		const auth_value = req.body.cookie[2].value;

		// Add Cookies to the Cookie Jar
		cookiejar.add(".AuthCookie="+auth_value, url);
		cookiejar.add("UniCookie="+uni_value, url);
	}catch(err){
		console.log(err);
	}

	// Send request to forest
	unirest.get(url)
		.encoding("binary")
		.headers({
			"Content-Type": "application/json",
			"userAgent": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)"
		})
		.jar(cookiejar)
		.end((response) => {
			console.log("=====GOT RESPONSSE=====");
			console.log(response.cookies);
			const tcookie = response.cookies;

			// if cookie from forest has ASP.NET_SessionId, .AuthCookie, UniCookie
			// Cookie that we got from user is an expired one..
			const expired = (tcookie.hasOwnProperty("ASP.NET_SessionId")&&
      tcookie.hasOwnProperty(".AuthCookie")&&
      tcookie.hasOwnProperty("UniCookie")) ? true : false;

			// 쿠키 만료 여부를 JSON 으로 처리하여 응답
			res.send(JSON.stringify({
				"expired":expired
			}));

		});
};
module.exports = run;

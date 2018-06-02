// 베이스 URL
const forestBaseUrl = "http://forest.skhu.ac.kr";
const skhuBaseUrl = "http://skhu.ac.kr";
const samBaseUrl = "http://sam.skhu.ac.kr";
const userAgentMacOSChrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
const userAgentIE = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
// 문자열에서 불필요한 요소를 제거하는 함수
const trim = function(raw){
	return raw.toString().replace(/[\n\t\r]/g,"").replace(/ {2}/g,"");
};

/*
  req : Express 요청 객체
  res : Express 응답 객체
  url : 요청을 위한 Url
  isEucKr : Url 로 요청을 보내면 받는 응답의 인코딩. EUC-KR 라면 true, UTF-8 이라면 false
*/
const get = function(req, res, url, isEucKr){
	// Promise 를 반환함.
	return new Promise((resolve, reject) => {

		const request = require("request");// http client 모듈

		const reqHeaders = {"User-Agent": userAgentMacOSChrome};
		if(req.get("Credential") != undefined && req.get("Credential") != null){
			reqHeaders.Cookie = req.get("Credential");
		}
		const reqEncoding = isEucKr ? null : "UTF-8";
		request({
			method: "GET",
			url: url,
			encoding: reqEncoding,
			headers: reqHeaders
		},
		(err, response, body) => {
			if(err != undefined && err != null) reject(err);
			let content = body;
			if(isEucKr){
				const Iconv = require("iconv").Iconv; // 인코딩 변환 모듈
				const iconv = new Iconv("EUC-KR","UTF-8//TRANSLIT//IGNORE"); // 인코딩 변환 모듈
				const buffer = new Buffer(body, "binary");
				content = iconv.convert(buffer).toString();
			}
			resolve(content);
		});
	});
};

const isDuplicated = function(array, key, value){
	for(let i=0; i<array.length; i++){
		if(key==""){
			if(array[i]==value){
				return true;
			}
		}else{
			if(eval("array[i]."+key)==value){
				return true;
			}
		}
	}
	return false;
};

// 학기 코드 변환 함수
const getSemesterCode = function(semester){
	switch(semester){
	case "first":
		return "Z0101";
	case "second":
		return "Z0102";
	case "summer":
		return "Z0103";
	case "winter":
		return "Z0104";
	default:
		return "Z0101";
	}
};

module.exports = {
	forestBaseUrl: forestBaseUrl,
	skhuBaseUrl: skhuBaseUrl,
	samBaseUrl: samBaseUrl,
	userAgentMacOSChrome: userAgentMacOSChrome,
	userAgentIE: userAgentIE,
	trim: trim,
	get: get,
	isDuplicated: isDuplicated,
	getSemesterCode: getSemesterCode
};

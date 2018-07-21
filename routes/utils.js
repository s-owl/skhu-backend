
module.exports = {
	// 베이스 URL
	forestBaseUrl: "http://forest.skhu.ac.kr",
	skhuBaseUrl: "http://skhu.ac.kr",
	samBaseUrl: "http://sam.skhu.ac.kr",
	userAgentMacOSChrome: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
	userAgentIE: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
	// 문자열에서 불필요한 요소를 제거하는 함수
	trim: (raw)=>{
		return raw.toString().replace(/[\n\t\r]/g,"").replace(/ {2}/g,"");
	},
	/*
	req : Express 요청 객체
	res : Express 응답 객체
	url : 요청을 위한 Url
	isEucKr : Url 로 요청을 보내면 받는 응답의 인코딩. EUC-KR 라면 true, UTF-8 이라면 false
	*/
	get: (req, res, url, isEucKr)=>{
		// Promise 를 반환함.
		return new Promise(async (resolve, reject) => {
			try{
				const axios = require("axios");
				const config = {};
				if(req.get("Credential") != undefined && req.get("Credential") != null){
					config.headers = {Cookie: req.get("Credential")};
				}
				if(isEucKr) config.responseType = "arraybuffer";
				const response = await axios.get(url, config);
				if(isEucKr){
					const Iconv = require("iconv").Iconv; // 인코딩 변환 모듈
					const iconv = new Iconv("EUC-KR","UTF-8//TRANSLIT//IGNORE"); // 인코딩 변환 모듈
					const buffer = new Buffer(response.data, "binary");
					resolve(iconv.convert(buffer).toString());
				}
				resolve(response.data);
			}catch(err){
				reject(err);
			}
		});
	},
	isDuplicated: (array, key, value)=>{
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
	},
	// 학기 코드 변환 함수

	getSemesterCode: (semester)=>{
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
	}
};

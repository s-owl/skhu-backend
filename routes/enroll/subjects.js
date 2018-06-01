const puppeteer= require('puppeteer');
const utils = require('../utils');

// /enroll/subjects
const run = async(req,res,next)=>{

  // URL 빌드
  let url = `${utils.forestBaseUrl}/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1`;

  let credential = req.get('Credential'); // Request의 Header 에서 Credential 값 로드
  const browser = await puppeteer.launch(); // Puppeteer 초기화
  const page = await browser.newPage(); // 페이지 생성
  await page.setJavaScriptEnabled(true); // Puppeteer 페이지에서 JS 활성화
  await page.setUserAgent(utils.userAgentIE); // User Agent 를 IE 로 설정

  // 문저열로 된 Credential 값을 쪼개서 JSON 객체 배열로 변환
  let credentialArray = [];
  let credentialItems=credential.split("; ");
  credentialItems.forEach((item)=>{
    let splited=item.split(/=(.+)/);
    let obj = { "name":splited[0], "value":splited[1], "domain":"forest.skhu.ac.kr"};
    if(splited[0] != "" && splited[1] != undefined){
      credentialArray.push(obj);
    }
  });
  console.log(credentialArray);
  await page.goto(url); // 페이지 이동 - 빈 페이지에서는 쿠키 설정 불가
  await page.setCookie(...credentialArray); // 객체 배열로 변환한 Credential 을 페이지 쿠키로 설정
  console.log(await page.cookies());

  // 특정 HTTP 요청 감시/차단
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    // 요청 URL 이 CoreSecurity.js 로 끝나면
    if (interceptedRequest.url().endsWith('CoreSecurity.js')){
      interceptedRequest.abort(); // 요청 탈취하야 취소 처리
    }else{
      interceptedRequest.continue(); // 그 외에는 그대로 진행
    } 
  });
  await page.goto(url); // 이동
  console.log(await page.url());
  // 테이블 접근하여 각 행(가로방향으로 한 줄) 추출하여 배열로 생성
  let items = await page.$$('#dgList > tbody > tr');
  console.log(items);
  let list = [];
  // 요소 배열 순회하면서 JSON 객채로 변환하여 새 배열에 삽입
  for(let item of items){
    let data = [];
    for(let i=1; i<12; i++){
      console.log(i);
      //각 행의 열 데이터를 뽑아 임시배열에 저장
      data.push(await item.$eval(`td:nth-of-type(${i})`, (node) => node.textContent));
    }
    // 임시배열에서 꺼내 최종 배열에 저장.
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
  // 처리된 데이터로 클라이언트의 요청에 응답
  res.json({
    "list": list
  });
};
module.exports= run;

const puppeteer= require('puppeteer');
const utils = require('../utils');
const run = async(req,res,next)=>{
  let url = `${utils.forestBaseUrl}/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1`;

  let credential = req.get('Credential');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setUserAgent(utils.userAgentIE);
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
  await page.goto(url);
  await page.setCookie(...credentialArray);
  console.log(await page.cookies());
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('CoreSecurity.js')){
      interceptedRequest.abort();
    }else{
      interceptedRequest.continue();
    } 
  });
  await page.goto(url);
  console.log(await page.url())
  let items = await page.$$('#dgList > tbody > tr');
  console.log(items);
  let list = [];
  items.forEach(async(item)=>{
    console.log("==========");
    console.log(item);
    let tds = await item.$$eval('td', node => node.innerHTML );
    console.log(tds);
  });
  // for(item in items){
  //   let td = item.$$("td");
  //   console.log(await td[0].getProperties());
  //   table.push({
  //     // "type": td[0].getproperty,
  //     // "grade": td[1].textContent,
  //     // "code": td[2].textContent,
  //     // "class": td[3].textContent,
  //     // "subject": td[4].textContent,
  //     // "score": td[5].textContent,
  //     // "professor": td[6].textContent,
  //     // "grade_limit": td[7].textContent,
  //     // "major_limit": td[8].textContent,
  //     // "time": td[9].textContent,
  //     // "note": td[10].textContent,
  //     // "available": td[11].textContent
  //   });
  // }
  // res.send(JSON.stringify)({
  //   "list": list
  // });
};
module.exports= run;

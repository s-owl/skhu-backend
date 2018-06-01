const puppeteer= require('puppeteer');
const utils = require('../utils');
const run = async(req,res,next)=>{
  let url = `${utils.forestBaseUrl}/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1`;

  let credental = req.get('credental');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let credentialArray = new Array();
  let credentialItems=credental.split(";");
  for(item in credentialItems){
    let splited=item.split(/=(.+)/);
    let obj = { "name":splited[0], "value":splited[1]};
    credentialArray.push(obj);
  }
  page.setCookie.apply(this, credentialArray);
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('CoreSecurity.js'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto(url);
  let items = await page.$$('#dgList > tbody > tr');
  let list = [];
  for(item in items){
    let td = item.$$("td");
    console.log(await td[0].getProperties());
    table.push({
      // "type": td[0].getproperty,
      // "grade": td[1].textContent,
      // "code": td[2].textContent,
      // "class": td[3].textContent,
      // "subject": td[4].textContent,
      // "score": td[5].textContent,
      // "professor": td[6].textContent,
      // "grade_limit": td[7].textContent,
      // "major_limit": td[8].textContent,
      // "time": td[9].textContent,
      // "note": td[10].textContent,
      // "available": td[11].textContent
    });
  }
  res.send(JSON.stringify)({
    "list": list
  });
};
module.exports= run;

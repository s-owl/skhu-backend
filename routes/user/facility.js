const puppeteer = require('puppeteer');
const utils = require('../utils');

const run = async (req, res, next) => {
  let url = `${utils.forestBaseUrl}Gate/SAM/Lesson/G/SSEG20P.aspx?&maincd=O&systemcd=S&seq=100`;

  let credential = req.get('credential');
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

  let items = await page.$$('#gv건물목록 > tbody > tr');
  let list = [];
  for( i in items){
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
  // const selector =
  const selBuilding = await page.click(selector, clickOptions);

}

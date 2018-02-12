const puppeteer = require('puppeteer');
const utils = require('../utils');
// 로그인 작업을 수행
const run = async (req, res, next) => {
  console.log("POST /user/login")

  // Page urls
  const logInPageUrl = `${utils.forestBaseUrl}/Gate/UniLogin.aspx`;
  const mainPageUrl = `${utils.forestBaseUrl}/Gate/UniMyMain.aspx`;
  const newLogInPageUrl = `http://cas.skhu.ac.kr`
  const newLogInAuthUrl0 = `${utils.samBaseUrl}/Auth/LoginSSO`;
  const newLogInAuthUrl1 = `${utils.samBaseUrl}/Auth/LoginSSO_ConsumeResponse`;

  const ID = req.body.userid, PW = req.body.userpw;
  let tried = false;

  let credentialOld = "";
  let credentialNew = "";
  let credentialNewToken = "";

  // Prepare headless chrome browser
  const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setUserAgent(utils.userAgentIE);

  // Listen for page fully loaded event
  page.on('load', () => {
    console.log(page.url());
    if(page.url() == logInPageUrl){
      if(tried){
        // If page is still login page, then it's failed.
        res.send("LOGIN FAILED!");
      }else{
        // 2. Put ID and PW then log in.
        console.log("forest.skhu.ac.kr - logging in");
        (async ()=>{
          let elementHandle = await page.$('#txtID');
          await elementHandle.type(ID);
          elementHandle = await page.$('#txtPW');
          await elementHandle.type(PW);
          elementHandle.press("Enter")
        })();
      }
    }else if(page.url() == mainPageUrl){
      // 5. Logged in.(forest.skhu.ac.kr)
      (async ()=>{
        try{
          // 6. Get cookie from the page
          const cookieObj = await page.cookies();
          for(let i in cookieObj){
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
          console.log("cas.skhu.ac.kr - logging in");
          let elementHandle = await page.$('#login-username');
          await elementHandle.type(ID);
          elementHandle = await page.$('#login-password');
          await elementHandle.type(PW);
          elementHandle.press("Enter")
          // await page.click('div.panel-body > button');
        }catch(e){
          console.log(e);
        }
      })();
    }else if(page.url().startsWith(utils.samBaseUrl)){
      //10. Logged In.(sam.skhu.ac.kr)
      (async ()=>{
        const cookieObj = await page.cookies();
        for(let i in cookieObj){
          credentialNew += `${cookieObj[i].name}=${cookieObj[i].value}; `;
        }
        //11. Get RequestVerificationToken
        console.log("sam.skhu.ac.kr - logged in");
        credentialNewToken = await page.evaluate(() => {
          return document.body.getAttribute("ncg-request-verification-token");
        });

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
}

module.exports = run;

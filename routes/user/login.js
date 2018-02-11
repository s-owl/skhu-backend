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

  let credentialOld;
  let credentialNew;
  let credentialNewToken;

  // Prepare headless chrome browser
  const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setUserAgent(utils.userAgentIE);

  // Listen for page fully loaded event
  page.on('load', () => {
    if(page.url() == logInPageUrl){
      if(tried){
        // If page is still login page, then it's failed.
        res.send("LOGIN FAILED!");
      }else{
        // 2. Put ID and PW then log in.
        (async ()=>{
          try{
            await page.evaluate((id, pw) => {
              // 3. Set ID and PW value into the form
              document.getElementById("txtID").value = id;
              document.getElementById("txtPW").value = pw;
              // 4. Log In
              document.all.ibtnLogin.click();
            }, ID, PW);
          }catch(e){
            console.log(e);
          }
        })();
      }
    }else if(page.url() == mainPageUrl){
      // 5. Logged in.(forest.skhu.ac.kr)
      (async ()=>{
        try{
          // 6. Get cookie from the page
          credentialOld = await page.evaluate(() => {
            return document.cookie;
          });
          // 7. Open sam.skhu.ac.kr that redirects to cas.skhu.ac.kr(login page for sam.skhu.ac.kr)
          await page.goto(utils.samBaseUrl);

        }catch(e){
          console.log(e);
        }
      })();
    }else if(page.url().startsWith(newLogInPageUrl)){
      (async ()=>{
        try{
          page.on('response', response => {
            // 10. get cookies
            if (response.url().startsWith(newLogInAuthUrl0)){
              credentialNew = response.headers().get("Set-Cookie").split(";")[0];
            }else if(response.url().startsWith(newLogInAuthUrl1)){
              credentialNew += response.headers().get("Set-Cookie").split(";")[0];
            }
          });
          await page.evaluate((id, pw) => {
            // 8. Set ID and PW value into the form
            document.getElementById("login-username").value = id;
            document.getElementById("login-password").value = pw;
            // 9. Log In (cas.skhu.ac.kr)
            document.querySelector("div.panel-body > button").click()
          }, ID, PW);
        }catch(e){
          console.log(e);
        }
      })();
    }else if(page.url().startsWith(utils.samBaseUrl)){
      //10. Logged In.(sam.skhu.ac.kr)

      //11. Get RequestVerificationToken
      credentialNewToken = await page.evaluate(() => {
        return document.body.getAttribute("ncg-request-verification-token");
      });

      // 12. send it to client
      res.json({
        "credential-old": credentialOld,
        "credential-new": credentialNew,
        "credential-new-token": credentialNewToken
      });
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

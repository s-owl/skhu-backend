const puppeteer = require('puppeteer');
const utils = require('../utils');
// 로그인 작업을 수행
const run = async (req, res, next) => {
  console.log("POST /user/login")

  // Page urls
  const logInPageUrl = `${utils.forestBaseUrl}/Gate/UniLogin.aspx`;
  const mainPageUrl = `${utils.forestBaseUrl}/Gate/UniMyMain.aspx`;

  const ID = req.body.userid, PW = req.body.userpw;
  let tried = false;

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
        // Put ID and PW then log in.
        (async ()=>{
          try{
            await page.evaluate((id, pw) => {
              // Set ID and PW value into the form
              console.log(id);
              console.log(pw);
              document.getElementById("txtID").value = id;
              document.getElementById("txtPW").value = pw;
              // Log In
              document.all.ibtnLogin.click();
            }, ID, PW);
          }catch(e){
            console.log(e);
          }
        })();
      }
    }else if(page.url() == mainPageUrl){
      // Logged in.
      (async ()=>{
        try{
          // Get cookie from the page
          const credential = await page.evaluate(() => {
            return document.cookie;
          });
          // Send it to client
          res.json({
            "credential-old" : credential
          });
        }catch(e){
          console.log(e);
        }
      })();
    }
  });

  try{
    // Open Log In Page
    await page.goto(logInPageUrl);
  } catch(e){
    console.log(e);
  }
}

module.exports = run;

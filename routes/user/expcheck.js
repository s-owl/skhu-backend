var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /user/expcheck");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/Gate/UniTopMenu.aspx";

  var unirest = require('unirest');
  var cookiejar = unirest.jar();

  try{
    var uni_value = req.body.cookie[1].value;
    var auth_value = req.body.cookie[2].value;

    // Add Cookies to the Cookie Jar
    cookiejar.add('.AuthCookie='+auth_value, url);
    cookiejar.add('UniCookie='+uni_value, url);
  }catch(err){
    console.log(err);
  }

  // Send request to forest
  unirest.get(url)
  .encoding('binary')
  .headers({
    'Content-Type': 'application/json',
    'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
      })
  .jar(cookiejar)
  .end(function (response) {
    console.log("=====GOT RESPONSSE=====");
    console.log(response.cookies);
    var tcookie = response.cookies;
    
    // if cookie from forest has ASP.NET_SessionId, .AuthCookie, UniCookie
    // Cookie that we got from user is an expired one..
    var expired = (tcookie.hasOwnProperty("ASP.NET_SessionId")&&
      tcookie.hasOwnProperty(".AuthCookie")&&
      tcookie.hasOwnProperty("UniCookie")) ? true : false;

    res.send(JSON.stringify({
      "expired":expired
    }));

  });
}
module.exports = run;

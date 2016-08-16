var unirest = require('unirest');
var cookiejar = unirest.jar();

var test_run = function(req, res, next){
  console.log("time table...");

  var url = req.body.url;
  var uni_value = req.body.cookie[1].value;
  var auth_value = req.body.cookie[2].value;

  // Cookie Add
  cookiejar.add('.AuthCookie='+auth_value, url);
  cookiejar.add('UniCookie='+uni_value, url);

  unirest.post(url)
  .headers({
    'Content-Type': 'application/json',
    'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
  })
  .jar(cookiejar)
  .end(function (response) {
    console.log(JSON.stringify(response.body));
  });

}

module.exports = test_run;

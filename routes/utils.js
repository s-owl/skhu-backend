var trim = function(raw){
  return raw.toString().replace(/[\n\t\r]/g,"").replace(/ /g,'');
}
exports.trim = trim;

var post = function(req, res, next, url){
  return new Promise(function(resolve, reject) {

    var unirest = require('unirest');
    var cookiejar = unirest.jar();
    var jsdom = require('jsdom');
    var Iconv = require('iconv').Iconv;
    var iconv = new Iconv('EUC-KR','UTF-8//TRANSLIT//IGNORE');

    var uni_value = req.body.cookie[1].value;
    var auth_value = req.body.cookie[2].value;

    // Add Cookies to the Cookie Jar
    cookiejar.add('.AuthCookie='+auth_value, url);
    cookiejar.add('UniCookie='+uni_value, url);

    // Send request to forest
    unirest.post(url)
    .encoding('binary')
    .headers({
      'Content-Type': 'application/json',
      'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
    })
    .jar(cookiejar)
    .end(function (response) {
      // Convert encoding from EUC-KR to UTF-8 using Iconv
      var buffer = new Buffer(response.body, 'binary');
      var converted = iconv.convert(buffer).toString();
      console.log(converted);

      jsdom.env( rawData, ["http://code.jquery.com/jquery.js"],
        function (err, window) {
          if(err==undefined){
            // We can now parse some data from html page
            resolve(window);
          }else{
            // Error!
            reject(err);
          }
        });
    });

  }
  });
}
exports.post = post;

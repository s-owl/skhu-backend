exports.baseurl = "http://forest.skhu.ac.kr";

var trim = function(raw){
  return raw.toString().replace(/[\n\t\r]/g,"").replace(/ /g,'');
}
exports.trim = trim;

/* GET Operation */
var get = function(req, res, next, url, doParse){
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
    unirest.get(url)
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
      if(doParse){
      jsdom.env( converted, ["http://code.jquery.com/jquery.js"],
        function (err, window) {
          if(err==undefined){
            // We can now parse some data from html page
            resolve(window, converted);
          }else{
            // Error!
            reject(err);
          }
        });
      }else{
        resolve(converted);
      }
    });


  });
}
exports.get = get;

/* POST Operation */
var post = function(req, res, next, url, doParse, data){
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
      'Content-Type': 'application/x-www-form-urlencoded;',
      'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
    })
    .send(data)
    .jar(cookiejar)
    .end(function (response) {
      // Convert encoding from EUC-KR to UTF-8 using Iconv
      var buffer = new Buffer(response.body, 'binary');
      var converted = iconv.convert(buffer).toString();
      console.log(converted);
      if(doParse){
      jsdom.env( converted, ["http://code.jquery.com/jquery.js"],
        function (err, window) {
          if(err==undefined){
            // We can now parse some data from html page
            resolve(window, converted);
          }else{
            // Error!
            reject(err);
          }
        });
      }else{
        resolve(converted);
      }
    });


  });

}
exports.post = post;

var isDuplicated = function(array, key, value){
  for(var i=0; i<array.length; i++){
    if(key==""){
      if(array[i]==value){
        return true;
      }
    }else{
      if(eval('array[i].'+key)==value){
        return true;
      }
    }
  }
  return false;
}

exports.isDuplicated = isDuplicated;

var getSemesterCode = function(semester){
  switch(semester){
    case "first":
      return "Z0101";
    case "second":
      return "Z0102";
    case "summer":
      return "Z0103";
    case "summer":
      return "Z0104";
    default:
      return "Z0101";
  }
}
exports.getSemesterCode = getSemesterCode;

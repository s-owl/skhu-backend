// 기존 Get방식 공통 ph파일

// Libraries
var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

// Arguments
var COOKIE1_domain = system.args[1];
var COOKIE1_httponly = system.args[2];
var COOKIE1_name = system.args[3];
var COOKIE1_path = system.args[4];
var COOKIE1_secure = system.args[5];
var COOKIE1_value = system.args[6];
var COOKIE2_domain = system.args[7];
var COOKIE2_httponly = system.args[8];
var COOKIE2_name = system.args[9];
var COOKIE2_path = system.args[10];
var COOKIE2_secure = system.args[11];
var COOKIE2_value = system.args[12];
var COOKIE3_domain = system.args[13];
var COOKIE3_httponly = system.args[14];
var COOKIE3_name = system.args[15];
var COOKIE3_path = system.args[16];
var COOKIE3_secure = system.args[17];
var COOKIE3_value = system.args[18];
var COOKIE4_domain = system.args[19];
var COOKIE4_httponly = system.args[20];
var COOKIE4_name = system.args[21];
var COOKIE4_path = system.args[22];
var COOKIE4_secure = system.args[23];
var COOKIE4_value = system.args[24];
var url = system.args[25];

// Add Cookies
phantom.addCookie({'domain':COOKIE1_domain, 'httponly':COOKIE1_httponly, 'name':COOKIE1_name, 'path':COOKIE1_path, 'secure':COOKIE1_secure, 'value':COOKIE1_value});
phantom.addCookie({'domain':COOKIE2_domain, 'httponly':COOKIE2_httponly, 'name':COOKIE2_name, 'path':COOKIE2_path, 'secure':COOKIE2_secure, 'value':COOKIE2_value});
phantom.addCookie({'domain':COOKIE3_domain, 'httponly':COOKIE3_httponly, 'name':COOKIE3_name, 'path':COOKIE3_path, 'secure':COOKIE3_secure, 'value':COOKIE3_value});
phantom.addCookie({'domain':COOKIE4_domain, 'httponly':COOKIE4_httponly, 'name':COOKIE4_name, 'path':COOKIE4_path, 'secure':COOKIE4_secure, 'value':COOKIE4_value});

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Page
page.open(url, function(status) {
});

// If Page is fully loaded
page.onLoadFinished = function(status) {
    console.log(page.content);
    phantom.exit();
};

// Error Handling
page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }
};

page.onResourceRequested = function(requestData, networkRequest) {
  // Block CoreSecurity.js - It will redirect us to the main page
  var burl="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
  if(requestData.url==burl){
    networkRequest.abort();
  }
};

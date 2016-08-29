var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var utils = require('../utils');

var url = utils.baseurl+"/GATE/SAM/LESSON/S/SSES01S.ASPX?maincd=O&systemcd=S&seq=1";

var TXTYY = system.args[1];
var DDLHAGGI = system.args[2];
var DDLSEARCH = system.args[3];
var TXTSEARCH = system.args[4];
var COOKIE1_domain = system.args[5];
var COOKIE1_httponly = system.args[6];
var COOKIE1_name = system.args[7];
var COOKIE1_path = system.args[8];
var COOKIE1_secure = system.args[9];
var COOKIE1_value = system.args[10];
var COOKIE2_domain = system.args[11];
var COOKIE2_httponly = system.args[12];
var COOKIE2_name = system.args[13];
var COOKIE2_path = system.args[14];
var COOKIE2_secure = system.args[15];
var COOKIE2_value = system.args[16];
var COOKIE3_domain = system.args[17];
var COOKIE3_httponly = system.args[18];
var COOKIE3_name = system.args[19];
var COOKIE3_path = system.args[20];
var COOKIE3_secure = system.args[21];
var COOKIE3_value = system.args[22];
var COOKIE4_domain = system.args[23];
var COOKIE4_httponly = system.args[24];
var COOKIE4_name = system.args[25];
var COOKIE4_path = system.args[26];
var COOKIE4_secure = system.args[27];
var COOKIE4_value = system.args[28];

phantom.addCookie({'domain':COOKIE1_domain, 'httponly':COOKIE1_httponly, 'name':COOKIE1_name, 'path':COOKIE1_path, 'secure':COOKIE1_secure, 'value':COOKIE1_value});
phantom.addCookie({'domain':COOKIE2_domain, 'httponly':COOKIE2_httponly, 'name':COOKIE2_name, 'path':COOKIE2_path, 'secure':COOKIE2_secure, 'value':COOKIE2_value});
phantom.addCookie({'domain':COOKIE3_domain, 'httponly':COOKIE3_httponly, 'name':COOKIE3_name, 'path':COOKIE3_path, 'secure':COOKIE3_secure, 'value':COOKIE3_value});
phantom.addCookie({'domain':COOKIE4_domain, 'httponly':COOKIE4_httponly, 'name':COOKIE4_name, 'path':COOKIE4_path, 'secure':COOKIE4_secure, 'value':COOKIE4_value});

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Syllabus Page
page.open(url, function(status) {
});

page.onLoadStarted = function(status){
  var cookies = page.cookies;
  console.log('Listing cookies:');
  for(var i in cookies) {
    console.log(cookies[i].name + '=' + cookies[i].value);
  }
  console.log("page = " + page.content);
}

// If Page is fully loaded
page.onLoadFinished = function(status) {
  Submit_Button();
  var content = page.content;
  console.log('Content: ' + content);
  phantom.exit();
};

function Submit_Button(){
   page.evaluate(function(year, haggi, ddlsearch, txtsearch){
     document.forms[0].all['txtSearch'].value = txtsearch;
     
  //   // Set value into the form
  //   document.querySelector("input[name='txtYy']").value = year;
  //   document.querySelector("select[name='ddlHaggi']").value = haggi;
  //   document.querySelector("select[name='ddlSearch']").value = ddlsearch;
  //   document.querySelector("input[name='txtSearch']").value = txtsearch;
  //   // Submit
  //   document.all.CSMenuButton1_List.click();
   }, TXTYY, DDLHAGGI, DDLSEARCH, TXTSEARCH);
}

// Error Handling
page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));
  phantom.exit();
};

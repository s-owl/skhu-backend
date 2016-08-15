var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var logInPageUrl = "https://forest.skhu.ac.kr/Gate/UniLogin.aspx";
var mainPageUrl = "https://forest.skhu.ac.kr/Gate/UniMyMain.aspx";

var ID = system.args[1];
var PW = system.args[2];
page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

page.open(logInPageUrl, function(status) {
  // console.log('OPEN / Status: ' + status);
  // Do other things here...

});

page.onLoadFinished = function(status) {
  // console.log('ONLOADFINISHED ============================================================');
  // console.log('ONLOADFINISHED / Url: ' + page.url);
  // console.log(page.content);
  // console.log('ONLOADFINISHED / Status: ' + status);
  // console.log('ONLOADFINISHED / Url: ' + page.url);
  if(page.url == logInPageUrl){
    logIn();
  }else if (page.url == mainPageUrl) {
    // console.log("LOGIN SUCCESS!")
    console.log(JSON.stringify(page.cookies));
    phantom.exit();
  }
};

function logIn(){
  page.evaluate(function(id, pw){
    document.querySelector("input[name='txtID']").value = id;
    document.querySelector("input[name='txtPW']").value = pw;
    document.all.ibtnLogin.click();
  }, ID, PW);
}


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

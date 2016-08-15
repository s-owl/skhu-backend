var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var logInPageUrl = "https://forest.skhu.ac.kr/Gate/UniLogin.aspx";
var mainPageUrl = "https://forest.skhu.ac.kr/Gate/UniMyMain.aspx";

var ID = system.args[1];
var PW = system.args[2];
page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Log In Page
page.open(logInPageUrl, function(status) {
});

// If Page is fully loaded
page.onLoadFinished = function(status) {
  if(page.url == logInPageUrl){
    // If page's url is sams as log in page's url, call logIn()
    logIn();
  }else if (page.url == mainPageUrl) {
    // If page's url is sams as main page's url, pass cookies of the page via console.log()
    console.log(JSON.stringify(page.cookies));
    /// Done, exit this script
    phantom.exit();
  }
};

function logIn(){
  page.evaluate(function(id, pw){
    // Set ID and PW value into the form
    document.querySelector("input[name='txtID']").value = id;
    document.querySelector("input[name='txtPW']").value = pw;
    // Log In
    document.all.ibtnLogin.click();
  }, ID, PW);
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

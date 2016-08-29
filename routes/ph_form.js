var system = require('system');
var webPage = require('webpage');
var page = webPage.create();


var tried = false;

var url = system.args[1];
var rawdata = system.args[2];
var jsondata = JSON.parse(rawdata);

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

for(var i=0; i<jsondata.cookie.length; i++){
  page.addCookie(jsondata.cookie[i]);
}
page.open(logInPageUrl, function(status) {
});

// If Page is fully loaded
page.onLoadFinished = function(status) {
  if(tried==false){
    for(var i=0; i<jsondata.form.length; i++){
    page.evaluate(function(id, value){
      document.querySelector("#"+id).value = value;
      }, jsondata.form[i].id, jsondata.form[i].value);
    }
    page.evaluate(function(id){
      document.querySelector("#"+id).click();
    }, jsondata.btnid);
    tried = true;
  }else{
    console.log(page.content);
    phantom.exit();
  }
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

  console.error(msgStack.join('\n'));
  phantom.exit();
};

var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var submited = false;

var url = system.args[1];
var resurl = system.args[2];
var formid = system.args[3];
var btnid = system.args[4];

var formlen = system.args[5];
var formids = [];
var formvals = [];

var cookiestart = 6+(formlen*2);

// Get form ids and values
for(var i=6; i<cookiestart; i+=2){
  formids.push(system.args[i]);
  formvals.push(system.args[i+1]);
}

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

for(var i=cookiestart; i<=system.args.length; i+=6){
  phantom.addCookie({
    'domain':system.args[i],
    'httponly':system.args[i+1],
    'name':system.args[i+2],
    'path':system.args[i+3],
    'secure':system.args[i+4],
    'value':system.args[i+5]
  });
}

// console.log(url, resurl, formid, btnid, formlen, formids, formvals);

// Load page
page.open(url, function(status) {
});

// If Page is fully loaded
page.onLoadFinished = function(status) {
  if(submited==false){
    for(var i=0; i<formids.length; i++){
      page.evaluate(function(fid, fval){
        document.querySelector("#"+fid).value = fval;
      }, formids[i], formvals[i]);
    }
    page.evaluate(function(fmid){
      document.querySelector("#"+fmid).submit();
    }, formid);
    submited = true;
  }else{
    if(btnid==0||btnid=='0'){
      console.log(page.content);
      phantom.exit();
    }else{
      page.evaluate(function(btnid){
        document.querySelector("#"+btnid).click();
      }, btnid);
    }
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

  // console.error(msgStack.join('\n'));
  // phantom.exit();
};

page.onResourceRequested = function(requestData, networkRequest) {
  // console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
  var url="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
  if(requestData.url==url){
    // console.log("Aborting resource request for "+url);
    networkRequest.abort();
  }
};

page.onResourceReceived = function(response){
    if(response.url == resurl && submited == true){
        // Wait for data to be displayed on the page.
        // For one sec maybe?
        setTimeout(function(){
          // Pass page content to node server with "console.log"
           console.log(page.content);
           // OK, Done.
            phantom.exit();
          }, 1000);
    }
};

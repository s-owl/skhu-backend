var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var url = 'https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA32S.ASPX?maincd=O&systemcd=S&seq=1';
var YEAR = system.args[1] == undefined ? '' : system.args[1];
var SEMESTER = system.args[2] == undefined ? '' : system.args[2];
var ROOMCODE = system.args[3] == undefined ? '' : system.args[3];
var BUILDING = system.args[4] == undefined ? '' : system.args[4];
var NAME = system.args[5] == undefined ? '' : system.args[5];
var PLACECODE = system.args[6] == undefined ? '' : system.args[6];
var COOKIE1_domain = system.args[7];
var COOKIE1_httponly = system.args[8];
var COOKIE1_name = system.args[9];
var COOKIE1_path = system.args[10];
var COOKIE1_secure = system.args[11];
var COOKIE1_value = system.args[12];
var COOKIE2_domain = system.args[13];
var COOKIE2_httponly = system.args[14];
var COOKIE2_name = system.args[15];
var COOKIE2_path = system.args[16];
var COOKIE2_secure = system.args[17];
var COOKIE2_value = system.args[18];
var COOKIE3_domain = system.args[19];
var COOKIE3_httponly = system.args[20];
var COOKIE3_name = system.args[21];
var COOKIE3_path = system.args[22];
var COOKIE3_secure = system.args[23];
var COOKIE3_value = system.args[24];
var COOKIE4_domain = system.args[25];
var COOKIE4_httponly = system.args[26];
var COOKIE4_name = system.args[27];
var COOKIE4_path = system.args[28];
var COOKIE4_secure = system.args[29];
var COOKIE4_value = system.args[30];

var submited = false;

// Add Cookies
phantom.addCookie({'domain':COOKIE1_domain, 'httponly':COOKIE1_httponly, 'name':COOKIE1_name, 'path':COOKIE1_path, 'secure':COOKIE1_secure, 'value':COOKIE1_value});
phantom.addCookie({'domain':COOKIE2_domain, 'httponly':COOKIE2_httponly, 'name':COOKIE2_name, 'path':COOKIE2_path, 'secure':COOKIE2_secure, 'value':COOKIE2_value});
phantom.addCookie({'domain':COOKIE3_domain, 'httponly':COOKIE3_httponly, 'name':COOKIE3_name, 'path':COOKIE3_path, 'secure':COOKIE3_secure, 'value':COOKIE3_value});
phantom.addCookie({'domain':COOKIE4_domain, 'httponly':COOKIE4_httponly, 'name':COOKIE4_name, 'path':COOKIE4_path, 'secure':COOKIE4_secure, 'value':COOKIE4_value});

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Syllabus Page
page.open(url, function(status) {
});

// If Page is fully loaded032-341-1120
page.onLoadFinished = function(status) {
  if(submited==false){
  page.evaluate(function(year, semester, roomcode, building, name, placecode){

    // Set Value on Input
    document.querySelector('#txtYy').value = year;
    document.querySelector('#ddlHaggi').value = semester;
    document.querySelector('#objRoom_txtPlaceCode').value = placecode;
    document.querySelector('#objRoom_txtRoomCodeNote').value	= name;
    document.querySelector('#objRoom_hidPlaceCode').value	= placecode;
    document.querySelector('#objRoom_hidBuildCode').value	= building;
    document.querySelector('#objRoom_hidRoomCode').value = roomcode;
    document.querySelector('#objRoom_hidNote').value = '';

    // Submit
    document.querySelector("#Form1").submit();
    // document.querySelector("#btnList").click();
  }, YEAR, SEMESTER, ROOMCODE, BUILDING, NAME, PLACECODE);
    submited = true;
  }else{
    page.evaluate(function(){
      // Click the button to load data
      document.querySelector("#btnList").click();
    });
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
  // Block CoreSecurity.js - It will redirect us to the main page
  var burl="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
  if(requestData.url==burl){
    networkRequest.abort();
  }
};

// When "Search" button clicked, it will make this event invoked soon.
// use this event to get data
page.onResourceReceived = function(response){
    var doneurl = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA32S.ASPX?maincd=O&systemcd=S&seq=1";
    if(response.url == doneurl){
        // Wait for data to be displayed on the page.
        // For one sec maybe?
        setTimeout(function(){
          // Pass page content to node server with "console.log"
           console.log(page.content);
           // OK, Done.
            phantom.exit();
          }, 1000);
    }
}

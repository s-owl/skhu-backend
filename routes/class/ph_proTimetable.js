var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var url = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA33S.ASPX?maincd=O&systemcd=S&seq=1";
var TXTYY = system.args[1] == undefined ? "" : system.args[1];
var DDLHAGGI = system.args[2] == undefined ? "" : system.args[2];
var OBJSTAFF_txtStaffNO = system.args[3] == undefined ? "" : system.args[3];
var OBJSTAFF_txtStaffName = system.args[4] == undefined ? "" : system.args[4];
var OBJSTAFF_hidStaffNO = system.args[5] == undefined ? "" : system.args[5];
var OBJSTAFF_hidJikjongCode = system.args[6] == undefined ? "" : system.args[6];
var OBJSTAFF_hidJikgubCode = system.args[7] == undefined ? "" : system.args[7];
var OBJSTAFF_hidDaehagCd = system.args[8] == undefined ? "" : system.args[8];
var OBJSTAFF_hidHagbuCd = system.args[9] == undefined ? "" : system.args[9];
var OBJSTAFF_hidSosogCd = system.args[10] == undefined ? "" : system.args[10];
var OBJSTAFF_hidSocialNO = system.args[11] == undefined ? "" : system.args[11];
var COOKIE1_domain = system.args[12];
var COOKIE1_httponly = system.args[13];
var COOKIE1_name = system.args[14];
var COOKIE1_path = system.args[15];
var COOKIE1_secure = system.args[16];
var COOKIE1_value = system.args[17];
var COOKIE2_domain = system.args[18];
var COOKIE2_httponly = system.args[19];
var COOKIE2_name = system.args[20];
var COOKIE2_path = system.args[21];
var COOKIE2_secure = system.args[22];
var COOKIE2_value = system.args[23];
var COOKIE3_domain = system.args[24];
var COOKIE3_httponly = system.args[25];
var COOKIE3_name = system.args[26];
var COOKIE3_path = system.args[27];
var COOKIE3_secure = system.args[28];
var COOKIE3_value = system.args[29];
var COOKIE4_domain = system.args[30];
var COOKIE4_httponly = system.args[31];
var COOKIE4_name = system.args[32];
var COOKIE4_path = system.args[33];
var COOKIE4_secure = system.args[34];
var COOKIE4_value = system.args[35];

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

// If Page is fully loaded
page.onLoadFinished = function(status) {
  if(submited==false){
  page.evaluate(function(year, haggi, txtStaffNO, txtStaffName, hidStaffNO, hidJikjongCode, hidJikgubCode, hidDaehagCd, hidHagbuCd, hidSosogCd, hidSocialNO){
    // Set Value on Input
    document.querySelector("#txtYy").value = year;
    document.querySelector("#ddlHaggi").value = haggi;
    document.querySelector("#objStaff_txtStaffNO").value = txtStaffNO;
    document.querySelector("#objStaff_txtStaffName").value = txtStaffName;
    document.querySelector("#objStaff_hidStaffNO").value = hidStaffNO;
    document.querySelector("#objStaff_hidJikjongCode").value = hidJikjongCode;
    document.querySelector("#objStaff_hidJikgubCode").value = hidJikgubCode;
    document.querySelector("#objStaff_hidDaehagCd").value = hidDaehagCd;
    document.querySelector("#objStaff_hidHagbuCd").value = hidHagbuCd;
    document.querySelector("#objStaff_hidSosogCd").value = hidSosogCd;
    document.querySelector("#objStaff_hidSocialNO").value = hidSocialNO;
    // Submit
    document.querySelector("#Form1").submit();
  }, TXTYY, DDLHAGGI, OBJSTAFF_txtStaffNO, OBJSTAFF_txtStaffName, OBJSTAFF_hidStaffNO, OBJSTAFF_hidJikjongCode, OBJSTAFF_hidJikgubCode, OBJSTAFF_hidDaehagCd, OBJSTAFF_hidHagbuCd, OBJSTAFF_hidSosogCd, OBJSTAFF_hidSocialNO);
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
  var url2="https://forest.skhu.ac.kr/Gate/WebResource.axd?d=WgVlYX0efBGxJXhBXjNsCeIhgJ38h0zeow8Q8nHWqLKo8J-Lv50es689k1LAwExwW0z4qxAcSVDH3VptpQ8Mk7gQQHDCl5Yp0&t=635763834602812500";
  var url3="https://forest.skhu.ac.kr/Gate/ScriptResource.axd?d=OI2L-wiAjFg359iAqiPiuhINr5of3sdj6YfqSnJHZLTh6-9tPLOd7VteAzUG8Q1PMdHD0NdynDMZd---xXTYkr7YonjCDD-igJu6ViBDAh-7yFz7IZjYeb50WOIghEjyGuSSde9IUWd-HsaRFZ2zXA02_pFnbhd4f_f6jZU0cLo1&t=5854e822";
  var url4="https://forest.skhu.ac.kr/Gate/ScriptResource.axd?d=zsuLAm_K3xT3dMF4rPOT__o_ITMHM7DVfhqeIMypivoUv0FGpPxCNKzJU0tshtvjPr6sBd6aQpe9MtocHHtK_MmlYsCH-m-eVpiH5bKGSelXJTaPPvsgKrHQ58JphpSq7e0qJ_M2K_aL9RHUUbkXI1SO8boWYV_Niv9hhrjRSN85CrGEJ9GIlQ2&t=5854e822";
  if(requestData.url==burl){
    networkRequest.abort();
  }
  if(requestData.url==url2){
    networkRequest.abort();
  }
  if(requestData.url==url3){
    networkRequest.abort();
  }
  if(requestData.url==url4){
    networkRequest.abort();
  }
};

// When "Search" button clicked, it will make this event invoked soon.
// use this event to get data
page.onResourceReceived = function(response){
    var doneurl = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/A/SSEA33S.ASPX?maincd=O&systemcd=S&seq=1";
    if(response.url == doneurl){
        // Wait for data to be displayed on the page.
        // For one sec maybe?
        setTimeout(function(){
          // Pass page content to node server with "console.log"
           //console.log(page.content);
           // OK, Done.
            phantom.exit();
          }, 1000);
    }
}

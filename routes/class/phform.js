var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

// var utils = require('../utils');

// var url = utils.baseurl+"/GATE/SAM/LESSON/S/SSES01S.ASPX?&maincd=O&systemcd=S&seq=1";
var url = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/S/SSES01S.ASPX?&maincd=O&systemcd=S&seq=1";
console.log("==========ph_syllabus.js==========");
console.log("=========="+url+"===========");
var TXTYY = "2016";
var DDLHAGGI = "Z0102";
var DDLSEARCH = "GWAMOG";
var TXTSEARCH = "C";
var COOKIE1_domain = "forest.skhu.ac.kr";
var COOKIE1_httponly = "false";
var COOKIE1_name = "KIS";
var COOKIE1_path = "/";
var COOKIE1_secure = "false";
var COOKIE1_value = "DaehagCd=IwhypDVkdy1ys37IstE2Kg==&HagbuCd=IwhypDVkdy0rWWY1RcY9HQ==&SosogCd=IwhypDVkdy0rWWY1RcY9HQ==&SosogNm=&DaehagCd2=IwhypDVkdy1ys37IstE2Kg==&HagbuCd2=IwhypDVkdy0rWWY1RcY9HQ==&SosogCd2=IwhypDVkdy0rWWY1RcY9HQ==&SosogNm2=8ettfwwoQhBWbP5TOwSfprVLh/jam/dGPv7FZbNVpdZJCJAvjRvU13xxzgsRXETZhKkO59P3^Qg7nZA/jxfrQ7e3SDxs2FEmDyoznQkmVocXBjRoqg87vaVjQ6hALakVb13VqbpVAQ8xx8ofUng/w9dQKIq0mkShZAz6sbqKslPevwjpmplYK3AyEPXGybOAc4fX9LGw9v2CsX73SgPGCesyQHNR315e3BnfYtyQkIpaQQ9IBbC1vNam2seAa5CogCE6GR2X5m1KoGQale3Ky80pMkOBOVF^8vte1XOna^FWlZJFD^GTMLgIiM2DiBzT&DaepyoSosog=Y";
var COOKIE2_domain = "forest.skhu.ac.kr";
var COOKIE2_httponly = "false";
var COOKIE2_name = "UniCookie";
var COOKIE2_path = "/";
var COOKIE2_secure = "false";
var COOKIE2_value = "CL=1&1=PLi3OE594ZlGN^lohXLsUugh9UrUbWpe&2=FZ3YO5fJlVKILQ228so9vratrpunyowiYtEsFjGlcyMevnjZtclIoA==&3=6w1Ns7LxObOeLIkJYgHgQi7^QjTmaCCZzkOQjW3Dfc02O5ORRKjqr/S4FEebC15A&4=Yui^R7VjSlGoDu5XLwDtAw==&5=PLi3OE594ZlGN^lohXLsUugh9UrUbWpe&6=YcXhhyWTtawXAMOIulGxTRWzs6LgbhIkc/epsWhJ9Sg=&7=PLi3OE594Zm8QMXAXlZZSaneUgiWFeuc&8=fRa/p5PaogA=&9=AvHnrH1^kUh8vHZ13LOZOg==&10=k3RiLxRaPNRXxMd0bVSnfA==&11=oJ6xJCysfNg=&12=fRa/p5PaogA=&13=5Q^1p3KcH2s=&14=5Q^1p3KcH2s=&15=31plrLG1L^hye1UZfEnzBQ==&16=am/U8GHgEpkHhByZ11u0wA==&17=1frDq2cPz7g=&20=Yui^R7VjSlGoDu5XLwDtAw==&UserType=1VyHGFvB7MQ=&DaehagCd=IwhypDVkdy1ys37IstE2Kg==&HagbuCd=IwhypDVkdy0rWWY1RcY9HQ==&SosogCd=IwhypDVkdy0rWWY1RcY9HQ==&SosogNm=8ettfwwoQhBWbP5TOwSfprVLh/jam/dGPv7FZbNVpdZJCJAvjRvU13xxzgsRXETZhKkO59P3^Qg7nZA/jxfrQ7e3SDxs2FEmDyoznQkmVocXBjRoqg87vaVjQ6hALakVb13VqbpVAQ8xx8ofUng/w9dQKIq0mkShZAz6sbqKslPevwjpmplYK3AyEPXGybOAc4fX9LGw9v2CsX73SgPGCesyQHNR315e3BnfYtyQkIpaQQ9IBbC1vNam2seAa5CogCE6GR2X5m1KoGQale3Ky80pMkOBOVF^8vte1XOna^FWlZJFD^GTMLgIiM2DiBzT&DaehagCd2=IwhypDVkdy1ys37IstE2Kg==&HagbuCd2=IwhypDVkdy0rWWY1RcY9HQ==&SosogCd2=IwhypDVkdy0rWWY1RcY9HQ==&SosogNm2=8ettfwwoQhBWbP5TOwSfprVLh/jam/dGPv7FZbNVpdZJCJAvjRvU13xxzgsRXETZhKkO59P3^Qg7nZA/jxfrQ7e3SDxs2FEmDyoznQkmVocXBjRoqg87vaVjQ6hALakVb13VqbpVAQ8xx8ofUng/w9dQKIq0mkShZAz6sbqKslPevwjpmplYK3AyEPXGybOAc4fX9LGw9v2CsX73SgPGCesyQHNR315e3BnfYtyQkIpaQQ9IBbC1vNam2seAa5CogCE6GR2X5m1KoGQale3Ky80pMkOBOVF^8vte1XOna^FWlZJFD^GTMLgIiM2DiBzT&SosogGb2=xwWePKA^Xxb16Eazc^dxKg==";
var COOKIE3_domain = "forest.skhu.ac.kr";
var COOKIE3_httponly = "true";
var COOKIE3_name = ".AuthCookie";
var COOKIE3_path = "/";
var COOKIE3_secure = "false";
var COOKIE3_value = "18CF90B5961541B2B1EE685ACC5B63364D521FC9B8B0F0CE8685A0249CA8B8C61FA1B4A7156050DBECB3A29072DE4D91C3E899B9F80A72CF923BC54259B797F0199A2F485B516BEE4B7C1FBEAD348E181F965964748A71DE0C8A617C5BB4843DDB0B34735D8CBB8E1102A2D119FD1C47AA847660663BA9204C51C6671937F1377DE5D4FCC69813B3";
var COOKIE4_domain = "forest.skhu.ac.kr";
var COOKIE4_httponly = "true";
var COOKIE4_name = "ASP.NET_SessionId";
var COOKIE4_path = "/";
var COOKIE4_secure = "false";
var COOKIE4_value = "kjinjyj5hzuuhuvlyxerauwc";

var submited = false;

phantom.addCookie({'domain':COOKIE1_domain, 'httponly':COOKIE1_httponly, 'name':COOKIE1_name, 'path':COOKIE1_path, 'secure':COOKIE1_secure, 'value':COOKIE1_value});
phantom.addCookie({'domain':COOKIE2_domain, 'httponly':COOKIE2_httponly, 'name':COOKIE2_name, 'path':COOKIE2_path, 'secure':COOKIE2_secure, 'value':COOKIE2_value});
phantom.addCookie({'domain':COOKIE3_domain, 'httponly':COOKIE3_httponly, 'name':COOKIE3_name, 'path':COOKIE3_path, 'secure':COOKIE3_secure, 'value':COOKIE3_value});
phantom.addCookie({'domain':COOKIE4_domain, 'httponly':COOKIE4_httponly, 'name':COOKIE4_name, 'path':COOKIE4_path, 'secure':COOKIE4_secure, 'value':COOKIE4_value});

page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Load Syllabus Page
page.open(url, function(status) {
    console.log("Opening page...");
});

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
  // phantom.exit();
};

page.onResourceRequested = function(requestData, networkRequest) {
    console.log("onReourceRequested : "+requestData.url);
  // console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
  var burl="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
  if(requestData.url==burl){
    console.log("Aborting resource request for "+burl);
    networkRequest.abort();
  }
};

page.onResourceReceived = function(response){
    console.log("ONRESOURCERECEIVED : "+response.url);
    var doneurl = "https://forest.skhu.ac.kr/GATE/SAM/LESSON/S/SSES01S.ASPX?maincd=O&systemcd=S&seq=1";
    if(response.url == doneurl){
        console.log("Printing result...");
setTimeout(function(){ console.log(page.content); }, 1000);
        
       // console.log(page.content);
    }
}

// If Page is fully loaded
page.onLoadFinished = function(status) {
  console.log(status);
  console.log("==========FULLY LOADED : "+page.url+"==========");
  console.log(page.content);
  if(submited==false){
  page.evaluate(function(year, haggi, ddlsearch, txtsearch){
    console.log("page.evaluate");
    // Set value into the form
    // document.querySelector("input[name='txtYy']").value = year;
    // document.querySelector("select[name='ddlHaggi']").value = haggi;
    // document.querySelector("select[name='ddlSearch']").value yerlgcm1szghn5nhe1a4bbzi= ddlsearch;
    // document.querySelector("input[name='txtSearch']").value = txtsearch;
    document.querySelector("#txtYy").value = year;
    document.querySelector("#ddlHaggi").value = haggi;
    document.querySelector("#ddlSearch").value = ddlsearch;
    document.querySelector("#txtSearch").value = txtsearch;
    // Submit
    document.querySelector("#Form1").submit();
  }, TXTYY, DDLHAGGI, DDLSEARCH, TXTSEARCH);
    submited = true;
    }else{
    page.evaluate(function(){
        console.log("Clickeing button...");
       document.querySelector("#CSMenuButton1_List").click();
    });
}
  // console.log(JSON.stringify(page));
  // phantom.exit();
};


/*
function Submit_Button(){
  page.evaluate(function(year, haggi, ddlsearch, txtsearch){
    // Set value into the form
    // document.querySelector("input[name='txtYy']").value = year;
    // document.querySelector("select[name='ddlHaggi']").value = haggi;
    // document.querySelector("select[name='ddlSearch']").value yerlgcm1szghn5nhe1a4bbzi= ddlsearch;
    // document.querySelector("input[name='txtSearch']").value = txtsearch;
    document.querySelector("#txtYy").value = year;
    document.querySelector("#ddlHaggi").value = haggi;
    document.querySelector("#ddlSearch").value = ddlsearch;
    document.querySelector("#txtSearch").value = txtsearch;
    // Submit
    document.all.CSMenuButton1_List.click();
  }, TXTYY, DDLHAGGI, DDLSEARCH, TXTSEARCH);
}
*/



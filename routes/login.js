var request = require('request');

var ViewState = "/wEPDwULLTE1Nzc4Mjk3MDMPZBYEAgEPZBYCAgMPDxYCHgdWaXNpYmxlaGRkAgMPFgIeCG9uU3VibWl0BSNqYXZhc2NyaXB0OnJldHVybiBDbGllbnRWYWxpZGF0ZSgpOxYKAgUPD2QWBB4Kb25LZXlQcmVzcwUtamF2YXNjcmlwdDpyZXR1cm4gRW50ZXJLZXlQcmVzcygnaWJ0bkxvZ2luJyk7HglvbmtleWRvd24FcGphdmFzY3JpcHQ6aWYod2luZG93LmV2ZW50LmtleUNvZGU9PScxMycgfHwgd2luZG93LmV2ZW50LmtleUNvZGU9PSc5Jyl7ZG9jdW1lbnQuYWxsLnR4dFBXLmZvY3VzKCk7cmV0dXJuIGZhbHNlO31kAgcPD2QWAh4Hb25jbGljawUfamF2YXNjcmlwdDpyZXR1cm4gRW1wdHlDaGVjaygpO2QCCQ8PZBYEHwIFK2phdmFzY3JpcHQ6cmV0dXJuIEVudGVyS2V5UHJlc3MoJ2lidE1vcmUnKTsfAwV0amF2YXNjcmlwdDppZih3aW5kb3cuZXZlbnQua2V5Q29kZT09JzEzJyB8fCB3aW5kb3cuZXZlbnQua2V5Q29kZT09JzknKXtkb2N1bWVudC5hbGwuaWJ0bkxvZ2luLmNsaWNrKCk7cmV0dXJuIGZhbHNlO31kAgsPEA9kFgIfAgUramF2YXNjcmlwdDpyZXR1cm4gRW50ZXJLZXlQcmVzcygnaWJ0TW9yZScpO2RkZAIPD2QWAmYPPCsACQEADxYGHgxSZXBlYXRMYXlvdXQLKiZTeXN0ZW0uV2ViLlVJLldlYkNvbnRyb2xzLlJlcGVhdExheW91dAAeCERhdGFLZXlzFgAeC18hSXRlbUNvdW50AgQWAh8CBTBqYXZhc2NyaXB0OnJldHVybiBFbnRlcktleVByZXNzKCdpYnRuU2VhcmNoSUQnKTsWCGYPZBYEAgEPDxYEHgRUZXh0BSnsooXtlansoJXrs7Tsi5zsiqTthZwgKEZvcmVzdCkg7ISc67KEIC4uLh4LTmF2aWdhdGVVcmwFeS9HYXRlL0NPUkVCb2FyZC9Ob3RpY2VfVi5hc3B4P05vdGljZWlkPTAxJkF0Y2xpZD0xNyZzS2V5PTZkOWI4ZGFhYjhiMTIyMGRkMWYwYzMyZGQxOTU1MzFjNzljYmVjMGMyYTAyNGJhZjI4YWNhNWQ1MDVhZjY2NDlkZAIDDw8WAh8AaGRkAgEPZBYEAgEPDxYEHwgFIVvsmYTro4xdIDIwMTTrhYQgMDTsm5QgMeydvCAxOC4uLh8JBXkvR2F0ZS9DT1JFQm9hcmQvTm90aWNlX1YuYXNweD9Ob3RpY2VpZD0wMSZBdGNsaWQ9MTYmc0tleT1hOWI4MDUwOWVmNDg3MGU1NzhlYmE3NjQ1YmU0MDFlNmZlOWYxZTEwZmFhNTZlMTJjNmJkZjQxMDQ4MTg1NjZjZGQCAw8PFgIfAGhkZAICD2QWBAIBDw8WBB8IBSlb7JmE66OMXeyihe2VqeygleuztCDsi5zsiqTthZwgKEZvcmVzdC4uLh8JBXkvR2F0ZS9DT1JFQm9hcmQvTm90aWNlX1YuYXNweD9Ob3RpY2VpZD0wMSZBdGNsaWQ9MTUmc0tleT05ZWRhZDAyNDdjYjE2ZGViNTAyZmY4YjU2ZGY1MDM5NmI0N2VlMmI1YjFmMmFmMDU5NmMwYzViZTMxNDNjYjQ1ZGQCAw8PFgIfAGhkZAIDD2QWBAIBDw8WBB8IBSdb7JmE66OMXeyekeyXheyViOuCtCAo66CI7Y+s7Yq4IOq0gOugqCkfCQV5L0dhdGUvQ09SRUJvYXJkL05vdGljZV9WLmFzcHg/Tm90aWNlaWQ9MDEmQXRjbGlkPTE0JnNLZXk9NGVjMzI1MjZkNTk5N2YzNmExYTI3ZjM3Y2IyZTg0NzZjNDJjNDljZjAzNzRkZDNiNDBjMzZlNDUwODcwYjgxYWRkAgMPDxYCHwBoZGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgUFCWlidG5Mb2dpbgUFY2hrSUQFB2lidE1vcmUFDGlidG5TZWFyY2hJRAUNaWJ0blNlYXJjaFB3ZOp8UHZypjlsoBhwwcSI7qbkt7kv3z/bE5FfZGp2aCGy";
var EvenValidation = "/wEWCALN18B6Aqz7luoPAoGjlK8FAr37yp4OAvrXp+4GAueD5KcKArPN1Y4NAuLrtM8FxzEKDdkbqJAbsQvXh6YmQlI6HahDtDGHXFKVrmtqwgA=";

var run = function(req, res, next){
  var url = "https://forest.skhu.ac.kr/Gate/UniLogin.aspx";
  var querystring = "?ReturnUrl=%252fGate%252fCORE%252fP%252fCORP02P.aspx";

  // 요청의 body 에서 Id, Pw 값 얻기
  var Id = req.body.studentid;
  var Pw = req.body.studentpw;

  var formData = {
    txtId: Id,
    txtPw: Pw,
    "iBtnLogin.x":0,
    "iBtnLogin.y":0,
    __VIEWSTATE:ViewState,
    __EVENVALIDATION:EvenValidation,
    __EVENTARGUMENT:"",
    __EVENTTARGET:"",
    __VIEWSTATEGENERATOR:"8F456783"
  };
  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://forest.skhu.ac.kr",
    "Referer": "https://forest.skhu.ac.kr/Gate/UniLogin.aspx",
    "User-Agent": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Host": "forest.skhu.ac.kr:443",
    "Save-Data": "on",
    "Upgrade-Insecure-Requests": "1",
    "Accept-Language": "ko,en-US;q=0.8,en;q=0.6,zh;q=0.4,zh-CN;q=0.2,zh-TW;q=0.2",
    "Accept-Encoding": "gzip, deflate, sdch, br",
    "Connection": "keep-alive",
    // "Cookie":"ASP.NET_SessionId=sczpwtesmv2h0gny3os3zfnk"
  };
  var options = {followAllRedirects: true, "rejectUnauthorized": false, "url": url, "method": "POST", "headers": headers};
  request(options, function (error, response, body) {
    // console.log(error);
    console.log(response);
    console.log(response.headers);
      var setcookie = response.headers["set-cookie"];
      if ( setcookie ) {
        setcookie.forEach(
          function ( cookiestr ) {
            console.log( "COOKIE:" + cookiestr );
          }
        );
      }
    // console.log(body);
      //Get Cookies from "response", then pass them to "res"
      res.send("Logged In!");
   });
}

module.exports = run;

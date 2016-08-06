var request = require('request');
var cheerio = require('cheerio');

var startTask = function(res){
  console.log("Forest");
  var url = "http://forest.skhu.ac.kr/Gate/UniLogin.aspx";
  console.log(url);

  var viewstate = '/wEPDwULLTE1Nzc4Mjk3MDMPZBYEAgEPZBYCAgMPDxYCHgdWaXNpYmxlaGRkAgMPFgIeCG9uU3VibWl0BSNqYXZhc2NyaXB0OnJldHVybiBDbGllbnRWYWxpZGF0ZSgpOxYKAgUPD2QWBB4Kb25LZXlQcmVzcwUtamF2YXNjcmlwdDpyZXR1cm4gRW50ZXJLZXlQcmVzcygnaWJ0bkxvZ2luJyk7HglvbmtleWRvd24FcGphdmFzY3JpcHQ6aWYod2luZG93LmV2ZW50LmtleUNvZGU9PScxMycgfHwgd2luZG93LmV2ZW50LmtleUNvZGU9PSc5Jyl7ZG9jdW1lbnQuYWxsLnR4dFBXLmZvY3VzKCk7cmV0dXJuIGZhbHNlO31kAgcPD2QWAh4Hb25jbGljawUfamF2YXNjcmlwdDpyZXR1cm4gRW1wdHlDaGVjaygpO2QCCQ8PZBYEHwIFK2phdmFzY3JpcHQ6cmV0dXJuIEVudGVyS2V5UHJlc3MoJ2lidE1vcmUnKTsfAwV0amF2YXNjcmlwdDppZih3aW5kb3cuZXZlbnQua2V5Q29kZT09JzEzJyB8fCB3aW5kb3cuZXZlbnQua2V5Q29kZT09JzknKXtkb2N1bWVudC5hbGwuaWJ0bkxvZ2luLmNsaWNrKCk7cmV0dXJuIGZhbHNlO31kAgsPEA9kFgIfAgUramF2YXNjcmlwdDpyZXR1cm4gRW50ZXJLZXlQcmVzcygnaWJ0TW9yZScpO2RkZAIPD2QWAmYPPCsACQEADxYGHgxSZXBlYXRMYXlvdXQLKiZTeXN0ZW0uV2ViLlVJLldlYkNvbnRyb2xzLlJlcGVhdExheW91dAAeCERhdGFLZXlzFgAeC18hSXRlbUNvdW50AgQWAh8CBTBqYXZhc2NyaXB0OnJldHVybiBFbnRlcktleVByZXNzKCdpYnRuU2VhcmNoSUQnKTsWCGYPZBYEAgEPDxYEHgRUZXh0BSnsooXtlansoJXrs7Tsi5zsiqTthZwgKEZvcmVzdCkg7ISc67KEIC4uLh4LTmF2aWdhdGVVcmwFeS9HYXRlL0NPUkVCb2FyZC9Ob3RpY2VfVi5hc3B4P05vdGljZWlkPTAxJkF0Y2xpZD0xNyZzS2V5PTZkOWI4ZGFhYjhiMTIyMGRkMWYwYzMyZGQxOTU1MzFjNzljYmVjMGMyYTAyNGJhZjI4YWNhNWQ1MDVhZjY2NDlkZAIDDw8WAh8AaGRkAgEPZBYEAgEPDxYEHwgFIVvsmYTro4xdIDIwMTTrhYQgMDTsm5QgMeydvCAxOC4uLh8JBXkvR2F0ZS9DT1JFQm9hcmQvTm90aWNlX1YuYXNweD9Ob3RpY2VpZD0wMSZBdGNsaWQ9MTYmc0tleT1hOWI4MDUwOWVmNDg3MGU1NzhlYmE3NjQ1YmU0MDFlNmZlOWYxZTEwZmFhNTZlMTJjNmJkZjQxMDQ4MTg1NjZjZGQCAw8PFgIfAGhkZAICD2QWBAIBDw8WBB8IBSlb7JmE66OMXeyihe2VqeygleuztCDsi5zsiqTthZwgKEZvcmVzdC4uLh8JBXkvR2F0ZS9DT1JFQm9hcmQvTm90aWNlX1YuYXNweD9Ob3RpY2VpZD0wMSZBdGNsaWQ9MTUmc0tleT05ZWRhZDAyNDdjYjE2ZGViNTAyZmY4YjU2ZGY1MDM5NmI0N2VlMmI1YjFmMmFmMDU5NmMwYzViZTMxNDNjYjQ1ZGQCAw8PFgIfAGhkZAIDD2QWBAIBDw8WBB8IBSdb7JmE66OMXeyekeyXheyViOuCtCAo66CI7Y+s7Yq4IOq0gOugqCkfCQV5L0dhdGUvQ09SRUJvYXJkL05vdGljZV9WLmFzcHg/Tm90aWNlaWQ9MDEmQXRjbGlkPTE0JnNLZXk9NGVjMzI1MjZkNTk5N2YzNmExYTI3ZjM3Y2IyZTg0NzZjNDJjNDljZjAzNzRkZDNiNDBjMzZlNDUwODcwYjgxYWRkAgMPDxYCHwBoZGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgUFCWlidG5Mb2dpbgUFY2hrSUQFB2lidE1vcmUFDGlidG5TZWFyY2hJRAUNaWJ0blNlYXJjaFB3ZOp8UHZypjlsoBhwwcSI7qbkt7kv3z/bE5FfZGp2aCGy';
  var formdata = {
    __VIEWSTATE: '%2FwEPDwULLTE1Nzc4Mjk3MDMPZBYEAgEPZBYCAgMPDxYCHgdWaXNpYmxlaGRkAgMPFgIeCG9uU3VibWl0BSNqYXZhc2NyaXB0OnJldHVybiBDbGllbnRWYWxpZGF0ZSgpOxYKAgUPD2QWBB4Kb25LZXlQcmVzcwUtamF2YXNjcmlwdDpyZXR1cm4gRW50ZXJLZXlQcmVzcygnaWJ0bkxvZ2luJyk7HglvbmtleWRvd24FcGphdmFzY3JpcHQ6aWYod2luZG93LmV2ZW50LmtleUNvZGU9PScxMycgfHwgd2luZG93LmV2ZW50LmtleUNvZGU9PSc5Jyl7ZG9jdW1lbnQuYWxsLnR4dFBXLmZvY3VzKCk7cmV0dXJuIGZhbHNlO31kAgcPD2QWAh4Hb25jbGljawUfamF2YXNjcmlwdDpyZXR1cm4gRW1wdHlDaGVjaygpO2QCCQ8PZBYEHwIFK2phdmFzY3JpcHQ6cmV0dXJuIEVudGVyS2V5UHJlc3MoJ2lidE1vcmUnKTsfAwV0amF2YXNjcmlwdDppZih3aW5kb3cuZXZlbnQua2V5Q29kZT09JzEzJyB8fCB3aW5kb3cuZXZlbnQua2V5Q29kZT09JzknKXtkb2N1bWVudC5hbGwuaWJ0bkxvZ2luLmNsaWNrKCk7cmV0dXJuIGZhbHNlO31kAgsPEA9kFgIfAgUramF2YXNjcmlwdDpyZXR1cm4gRW50ZXJLZXlQcmVzcygnaWJ0TW9yZScpO2RkZAIPD2QWAmYPPCsACQEADxYGHgxSZXBlYXRMYXlvdXQLKiZTeXN0ZW0uV2ViLlVJLldlYkNvbnRyb2xzLlJlcGVhdExheW91dAAeCERhdGFLZXlzFgAeC18hSXRlbUNvdW50AgQWAh8CBTBqYXZhc2NyaXB0OnJldHVybiBFbnRlcktleVByZXNzKCdpYnRuU2VhcmNoSUQnKTsWCGYPZBYEAgEPDxYEHgRUZXh0BSnsooXtlansoJXrs7Tsi5zsiqTthZwgKEZvcmVzdCkg7ISc67KEIC4uLh4LTmF2aWdhdGVVcmwFeS9HYXRlL0NPUkVCb2FyZC9Ob3RpY2VfVi5hc3B4P05vdGljZWlkPTAxJkF0Y2xpZD0xNyZzS2V5PTZkOWI4ZGFhYjhiMTIyMGRkMWYwYzMyZGQxOTU1MzFjNzljYmVjMGMyYTAyNGJhZjI4YWNhNWQ1MDVhZjY2NDlkZAIDDw8WAh8AaGRkAgEPZBYEAgEPDxYEHwgFIVvsmYTro4xdIDIwMTTrhYQgMDTsm5QgMeydvCAxOC4uLh8JBXkvR2F0ZS9DT1JFQm9hcmQvTm90aWNlX1YuYXNweD9Ob3RpY2VpZD0wMSZBdGNsaWQ9MTYmc0tleT1hOWI4MDUwOWVmNDg3MGU1NzhlYmE3NjQ1YmU0MDFlNmZlOWYxZTEwZmFhNTZlMTJjNmJkZjQxMDQ4MTg1NjZjZGQCAw8PFgIfAGhkZAICD2QWBAIBDw8WBB8IBSlb7JmE66OMXeyihe2VqeygleuztCDsi5zsiqTthZwgKEZvcmVzdC4uLh8JBXkvR2F0ZS9DT1JFQm9hcmQvTm90aWNlX1YuYXNweD9Ob3RpY2VpZD0wMSZBdGNsaWQ9MTUmc0tleT05ZWRhZDAyNDdjYjE2ZGViNTAyZmY4YjU2ZGY1MDM5NmI0N2VlMmI1YjFmMmFmMDU5NmMwYzViZTMxNDNjYjQ1ZGQCAw8PFgIfAGhkZAIDD2QWBAIBDw8WBB8IBSdb7JmE66OMXeyekeyXheyViOuCtCAo66CI7Y%2Bs7Yq4IOq0gOugqCkfCQV5L0dhdGUvQ09SRUJvYXJkL05vdGljZV9WLmFzcHg%2FTm90aWNlaWQ9MDEmQXRjbGlkPTE0JnNLZXk9NGVjMzI1MjZkNTk5N2YzNmExYTI3ZjM3Y2IyZTg0NzZjNDJjNDljZjAzNzRkZDNiNDBjMzZlNDUwODcwYjgxYWRkAgMPDxYCHwBoZGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgUFCWlidG5Mb2dpbgUFY2hrSUQFB2lidE1vcmUFDGlidG5TZWFyY2hJRAUNaWJ0blNlYXJjaFB3ZOp8UHZypjlsoBhwwcSI7qbkt7kv3z%2FbE5FfZGp2aCGy',
    __VIEWSTATEGENERATOR: '8F456783',
    __EVENTVALIDATION: '%2FwEWCALN18B6Aqz7luoPAoGjlK8FAr37yp4OAvrXp%2B4GAueD5KcKArPN1Y4NAuLrtM8FxzEKDdkbqJAbsQvXh6YmQlI6HahDtDGHXFKVrmtqwgA%3D',
    txtID: '201534028',
    'ibtnLogin.x': '15',
    'ibtnLogin.y': '11',
    txtPW: 'chyu4215'
  };

  var headers = {
    Host: 'forest.skhu.ac.kr',
    Connection: 'close',
    Content_Length: '2464',
    Cache_Control: 'max-age=0',
    Origin: 'https://forest.skhu.ac.kr',
    Upgrade_Insecure_Requests: '1',
    User_Agent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
    Content_Type: 'application/x-www-form-urlencoded',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    Referer: 'https://forest.skhu.ac.kr/Gate/UniLogin.aspx',
    Accept_Encoding: 'gzip, deflate, br',
    Accept_Language: 'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4',
    Cookie: 'Lib1Proxy2Ssn=219764609; _ga=GA1.3.980310094.1469335569; ASP.NET_SessionId=foz4ormai4ifgyzrlj1xgy4u; KIS='
  };

  var options = {
    "url": url,
    "method": "GET",
    "headers": headers,
    "formdata": formdata
  };
    request(options, function(error, response, html){
      var html = html.replace(/\/Gate\/Common/gm, 'http://forest.skhu.ac.kr/Gate/Common');
      var html = html.replace(/Common\/Images/gm, 'http://forest.skhu.ac.kr/Common/Images');
      var html = html.replace(/Common\/StyleSheet/gm, 'http://forest.skhu.ac.kr/Common/Stylesheet');
      var html = html.replace(/\/CoreIECheck/gm, '');
      var html = html.replace(/UniLogin.aspx/gm, 'http://forest.skhu.ac.kr/Gate/UniLogin.aspx');
      console.log("Res Received");

      if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        res.send($.html());
      console.log("success");
      } else {
        console.log(error);
        res.send(error);
      }
  });
}

module.exports = startTask;

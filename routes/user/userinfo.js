var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /user/userinfo");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/Gate/UniTopMenu.aspx";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
      var raw = window.$("#lblInfo").text();
      console.log(raw);
      var splited = raw.split(":");
      var userinfo = splited[1].split("(");
      var name = userinfo[0];
      var id = userinfo[1].split(")")[0];

      res.send(JSON.stringify({
        "userinfo" : {
          "name" : name,
          "id" : id
        }
      }));
  });
}
module.exports = run;

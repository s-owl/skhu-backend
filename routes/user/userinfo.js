var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /userinfo");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/Gate/UniTopMenu.aspx";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var deprecated = false;
    if(rawData.includes("로그인")){
      console.log("THIS COOKIE WAS DEPRECATED!");
      deprecated = true;
      res.send(JSON.stringify({
        "userinfo" : {
          "name" : "",
          "id" : ""
        },
        "deprecated" : deprecated
      }));
    }else{
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
        },
        "deprecated" : deprecated
      }));
    }
  });
}
module.exports = run;

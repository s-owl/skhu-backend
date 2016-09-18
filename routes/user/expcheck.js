var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /user/expcheck");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  var url = utils.baseurl+"/Gate/UniTopMenu.aspx";

  utils.get(req, res, next, url, false)
  .then(function(rawData){
    console.log("CHECKING IF COOKIE HAS BEEN EXPIRED");
    console.log(rawData);
    var expired = rawData.includes("로그인") ? true : false;
    res.send(JSON.stringify({
      "expired" : expired
    }))
  });
}
module.exports = run;

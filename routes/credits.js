var utils = require('./utils');

var run = function(req, res, next){
  console.log("POST /main");

  var url = utils.baseurl+"/Gate/UniMainStudent.aspx";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
    // Parse credits data
    var jsonCredits = [];
    var creditsNav = "#upContents > #divContainer > div:eq(2) > table > tbody";
    for(var i=0; i<12; i+=2){
      for(var j=0; j<3; j++){
        jsonCredits.push({
          "type" : utils.trim(window.$(creditsNav + "> tr:eq("+i+") > td:eq("+j+")").text()),
          "earned" : utils.trim(window.$(creditsNav + "> tr:eq("+(i+1)+") > td:eq("+j+")").text())
        })
      }
    }

    res.send(JSON.stringify({
      "credits" : jsonCredits
    }));
  });

}

module.exports = run;

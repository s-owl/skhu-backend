var utils = require('./utils');

var run = function(req, res, next){
  console.log("POST /main");

  var url = "http://forest.skhu.ac.kr/Gate/UniMainStudent.aspx";

  utils.post(req, res, next, url)
  .then(function(window){
    // Parse some data
  });

}

module.exports = run;

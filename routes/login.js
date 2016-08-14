var request = require('request');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
  var header = req.headers;
  var formData = req.body;
  console.log('로딩중...');

  request.post({url: 'http://forest.skhu.ac.kr/Gate/UniLogin.aspx', formData: formData}, function(err, response, html){
    var cookies = JSON.stringify(response.headers['set-cookie']);
    console.log(cookies);
  });
  //next();
});


module.exports = router;

var request = require('request');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
  console.log(res);
});


module.exports = router;

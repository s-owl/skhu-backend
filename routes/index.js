var express = require('express');
var router = express.Router();


// Load home page
var main = require('./main');
router.get('/', function(req, res, next){
  main(res);
});

module.exports = router;

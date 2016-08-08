var express = require('express');
var router = express.Router();


// Load home page
var main = require('./main');
router.get('/', function(req, res, next){
  main(res);
});

var login = require('./login');
router.post('/login', function(req, res, next){
  login(req, res, next);
});

module.exports = router;

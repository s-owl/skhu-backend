var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('UniLogin2');
});

var test = require('./test');
router.post('/UniLogin2', function(req, res, next){
  test(req, res);
});

/*
// Load home page
var main = require('./main');

router.get('/', function(req, res, next){
  main(res);
});

var login = require('./login');

router.get('/login/:studentid/:studentpw', function(req, res, next){
  login(res, req.params.studentid, req.params.studentpw);
});
*/
module.exports = router;

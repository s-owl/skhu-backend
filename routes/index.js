var express = require('express');
var router = express.Router();

/* GET 메인 페이지 */
router.get('/', function(req, res, next){
  res.render('login', {title : 'Mobile Forest With SSS!'} );
});

// POST - LOGIN
var login = require('./login2');
router.post('/login', login);

module.exports = router;

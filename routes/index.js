var express = require('express');
var router = express.Router();

/* GET 메인 페이지 */
router.get('/', function(req, res, next){
  res.render('login', {title : 'Mobile Forest With SSS!'} );
});

module.exports = router;

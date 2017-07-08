var express = require('express');
var router = express.Router();

// 교내 제출용 성적증명서 조회
// POST - certificate
var certificate = require('./certificate');
router.post('/certificate', certificate);

module.exports = router;

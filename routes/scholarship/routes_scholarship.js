var express = require('express');
var router = express.Router();

// 장학 신청 결과 조회
// POST - result
var result = require('./result');
router.post('/result', result);

// 장학 신청 내역 조회
// POST - history
var history = require('./history');
router.post('/history', history);

module.exports = router;

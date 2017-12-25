const express = require('express');
const router = express.Router();

// 장학 신청 결과 조회
// GET - result
const result = require('./result');
router.get('/result', result);

// 장학 신청 내역 조회
// GET - history
const history = require('./history');
router.get('/history', history);

module.exports = router;

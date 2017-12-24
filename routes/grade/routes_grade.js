const express = require('express');
const router = express.Router();

// 교내 제출용 성적증명서 조회
// POST - certificate
const certificate = require('./certificate');
router.get('/certificate', certificate);

module.exports = router;

var express = require('express');
var router = express.Router();

// 강의계획서 상세내용 조회
// POST - SYLLABUS_DETAILS
var syllabus_details = require('./syllabus_details');
router.post('/syllabus_details', syllabus_details);

module.exports = router;

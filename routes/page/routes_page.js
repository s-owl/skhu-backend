var express = require('express');
var router = express.Router();

// 강의계획서 상세내용 조회
// POST - SYLLABUS_DETAILS
var syllabus_details = require('./syllabus_details');
router.post('/syllabus_details', syllabus_details);

// 학사일정 조회
// POST - CALENDAR
var calendar = require('./calendar');
router.post('/calendar', calendar);

module.exports = router;

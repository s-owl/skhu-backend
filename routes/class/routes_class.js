// 수업 관리 관련 라우팅

var express = require('express');
var router = express.Router();

// 시간표
// POST - TIMETABLE
var timetable = require('./timetable');
router.post('/timetable', timetable);

// 강의계획서 조회
// POST - SYLLABUS
var syllabus = require('./syllabus');
router.post('/syllabus', syllabus);

module.exports = router;

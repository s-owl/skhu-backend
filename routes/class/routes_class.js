// 수업 관리 관련 라우팅

const express = require("express");
const router = express.Router();

// 시간표
// POST - TIMETABLE
// const timetable = require('./timetable');
// router.post('/timetable', timetable);

// 강의계획서 조회
// POST - SYLLABUS
// const syllabus = require('./syllabus');
// router.post('/syllabus', syllabus);

// 강의실별 시간표 조회
// POST - 강의실 검색
// const searchClassroom = require('./timetable/timetable_classroom').searchClassroom;
// router.post('/timetable/classroom/search', searchClassroom);

// const getTimetableOfClassroom = require('./timetable/timetable_classroom').getTimetableOfClassroom;
// router.post('/timetable/classroom', getTimetableOfClassroom);

module.exports = router;

const express = require('express');
const router = express.Router();

// POST - TIMETABLE
const timetable = require('./timetable');
router.post('/timetable', timetable);

// POST - SYLLABUS
const syllabus = require('./syllabus');
router.post('/syllabus', syllabus);

// POST - Professor List
const professorList = require('./timetable/professorList').professorList;
router.post('/timetable/professorList/', professorList);

// POST = Professor Timetable Search
const professorTimetable = require('./timetable/professorList').professorTimetable;
router.post('/timetable/professorTimetable',professorTimetable)

module.exports = router;

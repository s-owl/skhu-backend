var express = require('express');
var router = express.Router();

// POST - TIMETABLE
var timetable = require('./timetable');
router.post('/timetable', timetable);

// POST - SYLLABUS
var syllabus = require('./syllabus');
router.post('/syllabus', syllabus);

// POST - Professor timetable
var proTimetable = require('./proTimetable');
router.post('/proTimetable', proTimetable);

module.exports = router;

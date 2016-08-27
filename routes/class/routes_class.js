var express = require('express');
var router = express.Router();

// POST - TIMETABLE
var timetable = require('./timetable');
router.post('/timetable', timetable);

// POST - SYLLABUS
var syllabus = require('./syllabus');
router.post('/syllabus', syllabus);

module.exports = router;

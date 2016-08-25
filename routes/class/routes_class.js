var express = require('express');
var router = express.Router();

// POST - TIMETABLE
var timetable = require('./timetable');
router.post('/timetable', timetable);


module.exports = router;

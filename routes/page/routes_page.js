var express = require('express');
var router = express.Router();

// POST - SYLLABUS_DETAILS
var syllabus_details = require('./syllabus_details');
router.post('/syllabus_details', syllabus_details);

// POST - CALENDAR
var calendar = require('./calendar');
router.post('/calendar', calendar);

module.exports = router;

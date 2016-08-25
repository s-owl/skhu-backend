var express = require('express');
var router = express.Router();

// POST - LOGIN
var login = require('./login');
router.post('/login', login);

// POST - LOGOUT
var logout = require('./logout');
router.post('/logout', logout);

// POST - URL
var url = require('./url');
router.post('/url', url);

// POST - CREDITS
var credits = require('./credits');
router.post('/credits', credits);

// POST - MAIN
var attendance = require('./attendance');
router.post('/attendance', attendance);

// POST - TIMETABLE
var timetable = require('./timetable');
router.post('/timetable', timetable);

// POST - SUBJECTS
var subjects = require('./subjects');
router.post('/subjects', subjects);

module.exports = router;

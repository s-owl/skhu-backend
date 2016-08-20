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

// POST - MAIN
var main = require('./main');
router.post('/main', main);

// POST - TIMETABLE
var timetable = require('./timetable');
router.post('/timetable', timetable);

module.exports = router;

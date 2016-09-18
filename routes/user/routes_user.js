var express = require('express');
var router = express.Router();

// POST - LOGIN
var login = require('./login');
router.post('/login', login);

// POST - LOGOUT
var logout = require('./logout');
router.post('/logout', logout);

// POST - USERINFO
var userinfo = require('./userinfo');
router.post('/userinfo', userinfo);

// POST - CREDITS
var credits = require('./credits');
router.post('/credits', credits);

// POST - ATTENDANCE
var attendance = require('./attendance');
router.post('/attendance', attendance);

// POST - MENSES
var menses = require('./menses');
router.post('/menses', menses);

// POST - EXPCHECK
var expcheck = require('./expcheck');
router.post('/expcheck', expcheck);

module.exports = router;

var express = require('express');
var router = express.Router();

// POST - SUBJECTS
// var subjects = require('./subjects');
// router.post('/subjects', subjects);

var saved_credits = require('./saved_credits');
router.post('/saved_credits', saved_credits);
module.exports = router;

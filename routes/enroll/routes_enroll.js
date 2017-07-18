const express = require('express');
const router = express.Router();

// 개설과목 조회
// POST - SUBJECTS
const subjects = require('./subjects');
router.post('/subjects', subjects);

// 학점 세이브 조회
// POST -SAVED_CREDITES
const saved_credits = require('./saved_credits');
router.post('/saved_credits', saved_credits);
module.exports = router;

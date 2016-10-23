var express = require('express');
var router = express.Router();


// 학사일정 조회
// POST - schedules
var schedules = require('./schedules');
router.post('/schedules', schedules);

// 식단표 목록 조회
// GET - meal/urls
var meal_urls = require('./meal').getUrls;
router.get('/meal/urls', meal_urls);

// 식단표 데이터 조회
// POST - meal/data
var meal_data = require('./meal').getData;
router.post('/meal/data', meal_data);

module.exports = router;

const express = require('express');
const router = express.Router();


// 학사일정 조회
// POST - schedules
const schedules = require('./schedules');
router.post('/schedules', schedules);

// 식단표 목록 조회
// GET - meal/urls
const meal_urls = require('./meal').getUrls;
router.get('/meal/urls', meal_urls);

// 식단표 데이터 조회
// POST - meal/data
const meal_data = require('./meal').getData;
router.post('/meal/data', meal_data);

// 상담 이력 조회
// POST　-　consulting
const consulting = require('./consulting');
router.post('/consulting', consulting);

module.exports = router;

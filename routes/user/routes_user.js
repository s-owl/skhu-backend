// 사용자 관련 라우팅 모음

const express = require('express');
const router = express.Router();

// 로그인
// POST - LOGIN
const login = require('./login');
router.post('/login', login);

// 로그아웃
// POST - LOGOUT
const logout = require('./logout');
router.post('/logout', logout);

// 사용자 정보
// POST - USERINFO
const userinfo = require('./userinfo');
router.post('/userinfo', userinfo);

// 이수 학점 조회
// POST - CREDITS
const credits = require('./credits');
router.post('/credits', credits);

// 출결 현항 조회
// POST - ATTENDANCE
const attendance = require('./attendance');
router.post('/attendance', attendance);

// 생리공결
// POST - MENSES
const menses = require('./menses');
router.post('/menses', menses);

// 쿠키 만료 여부 확인
// POST - EXPCHECK
const expcheck = require('./expcheck');
router.post('/expcheck', expcheck);

module.exports = router;

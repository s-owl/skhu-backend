// 각종 라우팅을 연결하는 코드

// Express 프레임워크의 라우팅 모듈 로드
var express = require('express');
var router = express.Router();

// 서버 정보 표시
// 메소드 : GET　|　요청 경로 : /
var serverinfo = require('./serverinfo');
router.get('/', serverinfo);

// 사용자 관련 라우팅
// 요청 경로 : /user/*
var user = require('./user/routes_user');
router.use('/user', user);

// 수업 관리 관련 라우팅
// 요청 경로 : /class/*
var classs = require('./class/routes_class');
router.use('/class', classs);

// 수강관리 관련 라우팅
// 요청 경로 : /enroll/*
var enroll = require('./enroll/routes_enroll');
router.use('/enroll', enroll);

// 장학관리 관련 라우팅
// 요청 경로 : /scholarship/*
var scholarship = require('./scholarship/routes_scholarship');
router.use('/scholarship', scholarship);

// 성적관리 관련 라우팅
// 요청 경로 : /grade/*
var grade = require('./grade/routes_grade');
router.use('/grade', grade);

// 세부사항 페이지 관련 라우팅
// 요청 경로 : /page/*
var page = require('./page/routes_page');
router.use('/page', page);

// 다른 모듈에서 사용 가능하도록 노출
module.exports = router;
